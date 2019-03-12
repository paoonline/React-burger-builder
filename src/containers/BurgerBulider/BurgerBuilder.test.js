import React from 'react'

import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from './BurgerBulider'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'

configure({adapter: new Adapter()})

describe('<BurgerBuilder/>' , () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })

    it('should render <BuildControls /> when receving ings', ()=> {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })

    it('should render <Burger /> when receving ings', ()=> {
        wrapper.setProps({ings: {salad: 0}});
        expect(wrapper.find(Burger)).toHaveLength(1)
    })
})
