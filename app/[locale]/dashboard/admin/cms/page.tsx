"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryTable from "@/components/AdminComponents/category/CategoryTable";
import LanguageTable from "@/components/AdminComponents/language/LanguageTable";
import TagTable from "@/components/AdminComponents/tags/TagTable";
import SubCategoryTable from "@/components/AdminComponents/sub-category/SubCategoryTable";

const tabs = [
  { value: "category", label: "Category", content: <CategoryTable /> },
  {
    value: "sub-category",
    label: "Sub Category",
    content: <SubCategoryTable />,
  },
  { value: "language", label: "Language", content: <LanguageTable /> },
  { value: "tags", label: "Tags", content: <TagTable /> },
];

export default function CMSManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Content Management
        </h2>
        <p className="text-muted-foreground text-sm">
          Manage collections, categories, languages, and tags.
        </p>
      </div>

      <Tabs defaultValue="category">
        <TabsList className="mb-4">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
