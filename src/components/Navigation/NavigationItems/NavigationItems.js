import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
	
	return (
		// Because the 'active' attribute is a boolean value
		// we don't need to set active={true}
		// we can assign it like that: active

		// Now we no longer need to pass that info so we removed 'active'
		<ul className={classes.NavigationItems}>
			<NavigationItem clicked={props.clicked} link="/" exact>
				Burger Builder
			</NavigationItem>
			{props.isAuthenticated ? <NavigationItem clicked={props.clicked} link="/orders">Orders</NavigationItem> : null}
			{props.isAuthenticated ? (
				<NavigationItem clicked={props.clicked} link="/logout">Logout</NavigationItem>
			) : (
				<NavigationItem clicked={props.clicked} link="/auth">Authentication</NavigationItem>
			)}
			
		</ul>
	);
};

export default navigationItems;
