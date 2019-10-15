import React from 'react';
import { Link } from 'react-router-dom';

const AddBtn = props => {
	return (
		<Link to={props.linkTo} onClick={props.onClick} className="addBtn">
			<i className="fas fa-plus" />
		</Link>
	);
};

export default AddBtn;
