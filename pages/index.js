import React from "react"

import { client } from "../lib/client"

import { Product, FooterBanner, HeroBanner } from "../components"

const Home = ({ dataProducts, dataBanner }) => {
  return (
    <>
      <HeroBanner heroBanner={dataBanner.length && dataBanner[0]} />
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {dataProducts?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'
  const dataProducts = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'
  const dataBanner = await client.fetch(bannerQuery)

  return {
    props: { dataProducts, dataBanner },
  }
}

export default Home
