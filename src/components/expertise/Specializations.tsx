import { specializations } from "../../data/specializations"
import { SpecializationCard } from "./SpecializationCard"

export function Specializations() {
  return (
    <article className="expertise-panel expertise-panel--specializations">
      <div className="expertise-panel__heading">
        <span aria-hidden="true">専門</span>
        <h3>Our Specializations</h3>
      </div>
      <ul className="specialization-list">
        {specializations.map((item) => (
          <SpecializationCard item={item} key={item.number} />
        ))}
      </ul>
    </article>
  )
}
