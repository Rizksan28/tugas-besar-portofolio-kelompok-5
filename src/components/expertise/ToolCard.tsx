import { useState } from "react"
import type { Tool } from "../../types/expertise"

/** `icon` may be omitted when no reliable official logo exists — a text mark is shown instead. */
export function ToolCard({ tool }: { tool: { name: Tool["name"]; icon?: Tool["icon"] } }) {
  const [failed, setFailed] = useState(false)

  return (
    <li className="tool-tile" data-tooltip={tool.name}>
      {failed || !tool.icon ? (
        <span className="tool-tile__fallback" role="img" aria-label={tool.name}>
          {tool.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 3)}
        </span>
      ) : (
        <img
          src={tool.icon}
          alt={`${tool.name} logo`}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      <span className="tool-tile__name" aria-hidden="true">{tool.name}</span>
    </li>
  )
}
