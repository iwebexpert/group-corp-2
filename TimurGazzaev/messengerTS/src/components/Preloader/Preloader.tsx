import React  from 'react'
import preloader from './loader.svg'

export const Preloader: React.FC = () => {
    return <img className="preloader" src={preloader} alt="loading..."/>
}
