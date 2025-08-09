"use client"

import { useState } from "react"
import { X, Sparkles, Settings, Rocket, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModelPicker } from "@/components/model-picker"
import type { Template } from "@/lib/templates"
import { useRouter } from "next/navigation"

interface TemplateModalProps {
  template: Template
  isOpen: boolean
  onClose: () => void
}

export function TemplateModal({ template, isOpen, onClose }: TemplateModalProps) {
  const router = useRouter()
  const [customTitle, setCustomTitle] = useState(template.name)
  const [customDescription, setCustomDescription] = useState(template.description)
  const [selectedModel, setSelectedModel] = useState<any>(null)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleDeploy = async () => {
    if (!selectedModel) return

    setIsDeploying(true)

    // Simulate deployment delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create deployment configuration
    const deploymentConfig = {
      templateId: template.id,
      title: customTitle,
      description: customDescription,
      model: selectedModel,
      timestamp: Date.now(),
    }

    // Store in localStorage for the deployed page
    localStorage.setItem(`deployment-${template.id}`, JSON.stringify(deploymentConfig))

    // Navigate to deployed page
    router.push(`/deployed/${template.id}`)
    onClose()
  }

  const handleOpenInCursor = () => {
    // Simulate opening in Cursor
    window.open(`https://cursor.sh/clone?repo=openhub-template-${template.id}`, "_blank")
  }

  const handleOpenInLovable = () => {
    // Simulate opening in Lovable
    window.open(`https://lovable.dev/import?template=${template.id}`, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{template.name}</h2>
                <Badge variant="secondary" className="mt-1">
                  {template.category.replace("-", " ").toUpperCase()}
                </Badge>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="customize" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="customize" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Customize</span>
            </TabsTrigger>
            <TabsTrigger value="model" className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Model</span>
            </TabsTrigger>
            <TabsTrigger value="deploy" className="flex items-center space-x-2">
              <Rocket className="w-4 h-4" />
              <span>Deploy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="customize" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">App Title</Label>
                  <Input
                    id="title"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="Enter app title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Enter app description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Template Preview</h3>
                <div className="bg-white rounded border p-4">
                  <h4 className="font-bold text-lg mb-2">{customTitle}</h4>
                  <p className="text-gray-600 text-sm mb-3">{customDescription}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="model">
            <ModelPicker category={template.category} selectedModel={selectedModel} onModelSelect={setSelectedModel} />
          </TabsContent>

          <TabsContent value="deploy" className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Ready to Deploy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium mb-2">Configuration</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>Title: {customTitle}</div>
                    <div>Model: {selectedModel?.name || "Not selected"}</div>
                    <div>Category: {template.category}</div>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-medium mb-2">Deployment Options</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={handleOpenInCursor}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Cursor
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                      onClick={handleOpenInLovable}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Lovable
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleDeploy} disabled={!selectedModel || isDeploying} className="w-full" size="lg">
                {isDeploying ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 mr-2" />
                    Deploy App
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
