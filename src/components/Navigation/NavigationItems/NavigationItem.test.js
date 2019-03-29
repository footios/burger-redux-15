import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });
describe('<NavigationItems /> ', () => {
	let wrapper;

	wrapper = shallow(<NavigationItems />);
    
	it('render 2 NavigationItem elems if not auth', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
	});
    
	it('render 3 NavigationItem elems if yes auth', () => {
        // wrapper = shallow(<NavigationItems isAuthenticated />);
        wrapper.setProps({isAuthenticated: true})
		expect(wrapper.find(NavigationItem)).toHaveLength(3);
	});
});
