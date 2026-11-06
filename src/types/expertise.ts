export type SpecializationIconName =
  | "pen-tool"
  | "code"
  | "kanban"
  | "lightbulb"
  | "database"
  | "cloud"
  | "camera"

export type Specialization = {
  number: string
  title: string
  description: string
  icon: SpecializationIconName
}

export type ToolCategory =
  | "Design & Creative"
  | "Development"
  | "Project Management"
  | "Business & Analytics"

export type Tool = {
  id: string
  name: string
  category: ToolCategory
  icon: string
}
