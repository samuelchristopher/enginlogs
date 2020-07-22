import React from 'react'
import BottomBar from '../../skeleton/bottomBar'
import Search from '../../items/search'
import { Link } from 'react-router-dom'
import './items.css'

const ItemsPage = ({ items }) => (
    <div className="items_page__container user__container">
        <div className="user__logo"></div>
        <div className="tagline">what are you looking for?</div>
        <div className="items_page__content">
            <Search items={items}/>
            <section>
                <span className="items_page__title">categories</span>
                <div className="items_page__carteory_cards_container">
                    <Link to="/items/sports" className="items_page__category_card">
                        <strong>sports</strong>
                        <div className="grow"></div>
                        <div className="category_card__image sports"></div>
                    </Link>
                    <Link to="/items/electronics" className="items_page__category_card">
                        <strong>electronics</strong>
                        <div className="grow"></div>
                        <div className="category_card__image electronics"></div>
                    </Link>
                    <Link to="/items/camp" className="items_page__category_card">
                        <strong>camp</strong>
                        <div className="grow"></div>
                        <div className="category_card__image camp"></div>
                    </Link>
                    <Link to="/items/misc" className="items_page__category_card">
                        <strong>misc</strong>
                        <div className="grow"></div>
                        <div className="category_card__image misc"></div>
                    </Link>
                </div>
            </section>
        </div>
        <BottomBar />
    </div>
)

export default ItemsPage