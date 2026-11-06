import type { Tool, ToolCategory } from "../types/expertise"

export const toolCategories: ToolCategory[] = [
  "Design & Creative",
  "Development",
  "Project Management",
  "Business & Analytics",
]

// Logo sources and licenses: public/assets/tools/ATTRIBUTION.md
export const tools: Tool[] = [
  { id: "figma", name: "Figma", category: "Design & Creative", icon: "/assets/tools/figma.svg" },
  { id: "canva", name: "Canva", category: "Design & Creative", icon: "/assets/tools/canva.svg" },
  { id: "photoshop", name: "Adobe Photoshop", category: "Design & Creative", icon: "/assets/tools/photoshop.svg" },
  { id: "vscode", name: "Visual Studio Code", category: "Development", icon: "/assets/tools/vscode.svg" },
  { id: "laravel", name: "Laravel", category: "Development", icon: "/assets/tools/laravel.svg" },
  { id: "mysql", name: "MySQL", category: "Development", icon: "/assets/tools/mysql.svg" },
  { id: "jira", name: "Jira", category: "Project Management", icon: "/assets/tools/jira.svg" },
  { id: "trello", name: "Trello", category: "Project Management", icon: "/assets/tools/trello.svg" },
  { id: "microsoft-teams", name: "Microsoft Teams", category: "Project Management", icon: "/assets/tools/microsoft-teams.svg" },
  { id: "sap", name: "SAP ERP", category: "Business & Analytics", icon: "/assets/tools/sap.svg" },
  { id: "excel", name: "Microsoft Excel", category: "Business & Analytics", icon: "/assets/tools/excel.svg" },
  { id: "python", name: "Python", category: "Business & Analytics", icon: "/assets/tools/python.svg" },
]
