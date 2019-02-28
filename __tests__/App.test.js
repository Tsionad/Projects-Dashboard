import React from 'react'
import { shallow } from 'enzyme'
import App from '../src/components/App.jsx'

test('App component renders properly', () => {
  const wrapper = shallow(<App />)
  expect(wrapper).toMatchSnapshot()
})
