import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <div className="notfound">
            <h1>Page non trouvée </h1>
            <h3>Essayez ce lien : <Link to="/">Accueil</Link></h3>
        </div>
    )
}

export default NotFound
