import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../common/context/auth'
import DetailContext from '../../common/context/detail'
import TempDataContext from '../../common/context/tempData'
import IconList from '../../components/icon-list'
import MainGrid from '../../components/main-grid'
import CATEGORIES from '../../common/const/categories'
import { ConnectionError, DataError } from '../../common/const/errors'
import { TattooPicture } from '../../common/const/static/pictures'
import { toast } from 'react-toastify'
import { ENDPOINTS } from '../../common/const/paths'
import './index.sass'
import {
  Japanese, Dog, Moon, Comic, Demon,
  Skull, Videogames, Butterfly, Anime, Tree,
  Religion, Owl, Axe
} from '../../common/const/static/icons'

const Tatto = () => {
  const [tattoosList, setTattoosList] = useState([])

  const auth = useContext(AuthContext)
  const detail = useContext(DetailContext)
  const tempData = useContext(TempDataContext)

  const categories = [
    { icon: Japanese, title: CATEGORIES.JAPANESE.TEXT, val: CATEGORIES.JAPANESE.VALUE },
    { icon: Dog, title: CATEGORIES.DOGS.TEXT, val: CATEGORIES.DOGS.VALUE },
    { icon: Moon, title: CATEGORIES.MOONS.TEXT, val: CATEGORIES.MOONS.VALUE },
    { icon: Comic, title: CATEGORIES.COMICS.TEXT, val: CATEGORIES.COMICS.VALUE },
    { icon: Demon, title: CATEGORIES.DEMONS.TEXT, val: CATEGORIES.DEMONS.VALUE },
    { icon: Skull, title: CATEGORIES.SKULLS.TEXT, val: CATEGORIES.SKULLS.VALUE },
    { icon: Videogames, title: CATEGORIES.VIDEOGAMES.TEXT, val: CATEGORIES.VIDEOGAMES.VALUE },
    { icon: Butterfly, title: CATEGORIES.BUTTERFLIES.TEXT, val: CATEGORIES.BUTTERFLIES.VALUE },
    { icon: Anime, title: CATEGORIES.ANIME.TEXT, val: CATEGORIES.ANIME.VALUE },
    { icon: Tree, title: CATEGORIES.TREES.TEXT, val: CATEGORIES.TREES.VALUE },
    { icon: Religion, title: CATEGORIES.RELIGION.TEXT, val: CATEGORIES.RELIGION.VALUE },
    { icon: Owl, title: CATEGORIES.OWLS.TEXT, val: CATEGORIES.OWLS.VALUE },
    { icon: Axe, title: CATEGORIES.AXES.TEXT, val: CATEGORIES.AXES.VALUE }
  ]

  const divideArrayIntoGroups = pictures => {
    const result = []

    for (let i = 0; i < pictures.length; i += 6) {
      const group = pictures.slice(i, i + 6)
      result.push(group)
    }

    return result
  }

  const getPictures = catNumber => {
    fetch(ENDPOINTS.TATTOOS, {
      method: 'POST',
      body: JSON.stringify({ category: categories[catNumber].val }),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': auth.csrfToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!('success' in data)) { throw new DataError() }

        if (data.success) {
          if (!('pictures' in data)) { throw new DataError() }

          const splitedItems = divideArrayIntoGroups(data.pictures)
          setTattoosList(splitedItems)
        }
      })
      .catch(() => { throw new ConnectionError() })
  }

  const handleClick = e => {
    const selected = document.querySelector('ul.icon-list li.selected')
    const linked = Number(e.target.getAttribute('linked'))

    try {
      getPictures(linked)
      if (selected) { selected.classList.remove('selected') }
      e.target.parentNode.classList.add('selected')
    } catch (error) {
      if (error instanceof ConnectionError) { toast.error(error.message) }
      if (error instanceof DataError) { console.debug('Unexpected') }
    }
  }

  const handleViewDetail = async id => {
    const copy = [...tattoosList]
    let selected
    for (const sub of copy) {
      selected = sub.find(picture => picture.id === id)
      if (selected) { break }
    }

    if (selected) {
      detail.setIsVisible(true)
      detail.setPicture(selected.file)
      detail.setPictureId(selected.id)
    }
  }

  useEffect(() => {
    if (tempData.category) {
      const iconElements = [...document.querySelectorAll('ul.icon-list li button')]
      const catNumber = categories.findIndex(item => item.val === tempData.category)

      try {
        getPictures(catNumber)

        const selected = iconElements.findIndex(item => item.getAttribute('linked') === catNumber)
        iconElements[selected].parentNode.classList.add('selected')

        tempData.setCategory('')
      } catch (error) {
        if (error instanceof ConnectionError) { toast.error(error.message) }
        if (error instanceof DataError) { console.debug('Unexpected') }
      }
    }
  }, [])

  const PictureLandingCode = (
    <div className='picture-landing-container'>
      <div className='mask'>
        <span>Descubre nuestros nuevos diseños</span>
      </div>
      <img src={TattooPicture} alt='tattoo' className='landing' />
    </div>
  )

  return (
    <main className='tattoo'>
      <aside>
        <h2>Categorias</h2>
        <IconList items={categories} handleClick={handleClick} />
      </aside>
      <div className='content'>
        {tattoosList.length < 1
          ? PictureLandingCode
          : tattoosList.map((pictures, index) => (
            <MainGrid
              key={index}
              pictures={pictures}
              onClick={handleViewDetail}
              masks={pictures.map((picture, i) => (
                <div className='mask' key={i}>
                  <span className='price'>{`$ ${picture.price.toLocaleString()}`}</span>
                  <span className='size'>{`${picture.width}x${picture.height} cm`}</span>
                </div>
              ))}
              reverse={index % 2 !== 0}
            />
          ))}
      </div>
    </main>
  )
}

export default Tatto
