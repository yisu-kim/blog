import React from "react"
import { Link } from "gatsby"

function Pagination({ prev, next }) {
  return (
    <nav className="pagination">
      <ul>
        {prev && (
          <li className="pagination-previous">
            {prev.secondText && <p>{prev.secondText}</p>}
            <Link to={prev.to} rel="prev">
              ← {prev.text}
            </Link>
          </li>
        )}
        {next && (
          <li className="pagination-next">
            {next.secondText && <p>{next.secondText}</p>}
            <Link to={next.to} rel="next">
              {next.text} →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
