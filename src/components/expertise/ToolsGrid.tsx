import { toolCategories, tools } from "../../data/tools"
import { ToolCard } from "./ToolCard"

export function ToolsGrid() {
  return (
    <article className="expertise-panel expertise-panel--tools">
      <div className="expertise-panel__heading">
        <span aria-hidden="true">道具</span>
        <h3>Tools We Use</h3>
      </div>
      <div className="tool-groups">
        {toolCategories.map((category) => (
          <section className="tool-group" key={category} aria-label={category}>
            <h4>{category}</h4>
            <ul>
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <ToolCard tool={tool} key={tool.id} />
                ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  )
}
