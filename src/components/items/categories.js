import React from 'react'
import './categories.css'
import { Link } from 'react-router-dom'
import Search from './search'

const Categories = ({ isLoan, items }) => (
	<div className="categories__container">
        {/* <Link to='/search'>Search here!</Link> */}
        <Search items={items}/>
        <div className="categories__card categories__card--sports">
		    <Link className="categories__card--title" to={`/${isLoan ? 'loan' : 'view'}/sports`} >Sports</Link>
        </div>
        <div className="categories__card categories__card--elec">
		    <Link className="categories__card--title" to={`/${isLoan ? 'loan' : 'view'}/electronics`} >Electronics</Link>
        </div>
        <div className="categories__card categories__card--camp">
		    <Link className="categories__card--title" to={`/${isLoan ? 'loan' : 'view'}/camp`} >Camp</Link>
        </div>
        <div className="categories__card categories__card--misc">
		    <Link className="categories__card--title" to={`/${isLoan ? 'loan' : 'view'}/misc`} >Misc</Link>
        </div>
	</div>
)

export default Categories