import React from 'react';
import estilos from './Loading.module.css';
import gif from './gif2.gif'

export function Loading () {
  return (
    <div className={estilos.loading}>
      <h1>Loading...</h1>
      <img src={gif} alt='Loading...' />
    </div>
  )
}