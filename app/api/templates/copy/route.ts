import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const { templateId, targetPath } = await request.json();

    if (!templateId) {
      return NextResponse.json(
        { error: "Template ID is required" },
        { status: 400 }
      );
    }

    // Define source template path
    const sourceTemplatePath = path.join(
      process.cwd(),
      "templates",
      templateId
    );

    // Check if template exists
    try {
      await fs.access(sourceTemplatePath);
    } catch (error) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // If no target path provided, copy to user's Downloads with a default name
    const downloadsPath = path.join(
      process.env.HOME || process.env.USERPROFILE || "",
      "Downloads"
    );

    // Find an available directory name
    let finalTargetPath = path.join(downloadsPath, `${templateId}-copy`);
    let counter = 2;

    while (true) {
      try {
        await fs.access(finalTargetPath);
        // Directory exists, try next number
        finalTargetPath = path.join(
          downloadsPath,
          `${templateId}-copy-${counter}`
        );
        counter++;
      } catch (error) {
        // Directory doesn't exist, we can use this path
        break;
      }
    }

    if (targetPath) {
      finalTargetPath = targetPath;
    }

    // Copy the template directory recursively
    await copyDirectory(sourceTemplatePath, finalTargetPath);

    // Open in Cursor if available
    try {
      // Try different approaches to open in Cursor based on platform
      const platform = process.platform;
      if (platform === "darwin") {
        // On macOS, try cursor command first, then open command
        try {
          await execAsync(`cursor "${finalTargetPath}"`);
        } catch (error) {
          console.warn("Cursor command failed, trying open:", error);
          await execAsync(`open -a "Cursor" "${finalTargetPath}"`);
        }
      } else if (platform === "win32") {
        // On Windows
        try {
          await execAsync(`cursor "${finalTargetPath}"`);
        } catch (error) {
          console.warn("Cursor command failed, trying direct path:", error);
          await execAsync(
            `"C:\\Users\\%USERNAME%\\AppData\\Local\\Programs\\cursor\\Cursor.exe" "${finalTargetPath}"`
          );
        }
      } else {
        // On Linux
        await execAsync(`cursor "${finalTargetPath}"`);
      }
    } catch (cursorError) {
      console.warn("All Cursor opening methods failed:", cursorError);
      // Fallback: just open the directory
      try {
        const platform = process.platform;
        if (platform === "darwin") {
          await execAsync(`open "${finalTargetPath}"`);
        } else if (platform === "win32") {
          await execAsync(`explorer "${finalTargetPath}"`);
        } else {
          await execAsync(`xdg-open "${finalTargetPath}"`);
        }
      } catch (openError) {
        console.warn("Failed to open directory:", openError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Template copied successfully",
      targetPath: finalTargetPath,
    });
  } catch (error) {
    console.error("Error copying template:", error);
    return NextResponse.json(
      { error: "Failed to copy template" },
      { status: 500 }
    );
  }
}

async function copyDirectory(
  source: string,
  destination: string
): Promise<void> {
  await fs.mkdir(destination, { recursive: true });

  const items = await fs.readdir(source, { withFileTypes: true });

  for (const item of items) {
    const sourcePath = path.join(source, item.name);
    const destPath = path.join(destination, item.name);

    // Skip node_modules and other unnecessary directories
    if (
      item.name === "node_modules" ||
      item.name === ".next" ||
      item.name === ".git" ||
      item.name === "dist" ||
      item.name === "build"
    ) {
      continue;
    }

    if (item.isDirectory()) {
      await copyDirectory(sourcePath, destPath);
    } else {
      await fs.copyFile(sourcePath, destPath);
    }
  }
}
