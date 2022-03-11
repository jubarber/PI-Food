import estilos from './Landing.module.css';
import React from 'react';
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <section className={estilos.full}>
      <div className={estilos.fullInner}>
        <div className={estilos.content}>
          <h1>Welcome</h1>
          <Link to='/home' className={estilos.btn}>LET'S COOK!</Link>
        </div>
      </div>
    </section>
  )
}