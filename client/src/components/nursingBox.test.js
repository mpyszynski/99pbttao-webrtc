import React from 'react'
import { shallow } from 'enzyme'
import ProductBox from './ProductBox'

describe('<ProductBox />', () => {
    test('should render product image', () => {
        const wrapper = shallow(<ProductBox img='img-url' labels={'label1 label2'}/>)
        const image = wrapper.find('img').props()
        expect(image.src).toEqual('img-url')
    })
    test('should render name', () => {
        const wrapper = shallow(<ProductBox name='product-name' labels={'label1 label2'}/>)
        expect(wrapper.find('h3').text()).toEqual('product-name')
    })
    test('should render correct path in link', () => {
        const wrapper = shallow(<ProductBox labels={'label1 label2'} id='123451234512'/>)
        expect(wrapper.props().to).toEqual('/products/123451234512')
    }) 
})