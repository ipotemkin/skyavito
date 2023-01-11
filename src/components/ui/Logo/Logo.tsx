import React from 'react'
import { Link } from 'react-router-dom'

import TrianglesIcon from '../../../icons/Triangles/TrianglesIcon'
import { ROUTES } from '../../../routes'

export const Logo = () => {
  return (
    <Link to={ROUTES.home}>
      <TrianglesIcon />
    </Link>
  )
}
