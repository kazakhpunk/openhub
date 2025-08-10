"use client";

import { useState, useEffect } from "react";
import { Search, Zap, Clock, DollarSign, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getModelsForCategory, type Model } from "@/lib/models";

interface ModelPickerProps {
  category: string;
  selectedModel: Model | null;
  onModelSelect: (model: Model) => void;
}

export function ModelPicker({
  category,
  selectedModel,
  onModelSelect,
}: ModelPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      const categoryModels = await getModelsForCategory(category);
      setModels(categoryModels);
      setLoading(false);
    };
    loadModels();
  }, [category]);

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const popularModels = filteredModels.filter((model) => model.popular);
  const otherModels = filteredModels.filter((model) => !model.popular);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Choose a Model</h3>
          <p className="text-sm text-gray-600">
            Select a model compatible with {category.replace("-", " ")} tasks
          </p>
        </div>
        <Badge variant="secondary">{models.length} models available</Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search models..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="popular" className="w-full">
        <TabsList>
          <TabsTrigger value="popular">
            Popular ({popularModels.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            Other Models ({otherModels.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {popularModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isSelected={selectedModel?.id === model.id}
                onSelect={() => onModelSelect(model)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {otherModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isSelected={selectedModel?.id === model.id}
                onSelect={() => onModelSelect(model)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredModels.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">No models found matching your search</p>
        </div>
      )}
    </div>
  );
}

function ModelCard({
  model,
  isSelected,
  onSelect,
}: {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-purple-500 bg-purple-50"
          : "hover:shadow-md hover:bg-gray-50"
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{model.name}</CardTitle>
          <div className="flex items-center space-x-1">
            {model.popular && (
              <Badge variant="secondary" className="text-xs">
                <Star className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
        </div>
        <CardDescription className="text-sm">
          {model.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between lg:grid lg:grid-cols-2 lg:gap-2 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>{model.speed}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{model.latency}</span>
          </div>
          <div className="flex items-center space-x-1 col-span-2">
            <DollarSign className="w-3 h-3" />
            <span>{model.pricing}</span>
          </div>
        </div>
        <div className="mt-3">
          <Button
            size="sm"
            variant={isSelected ? "default" : "outline"}
            className="w-full"
          >
            {isSelected ? "Selected" : "Select Model"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
