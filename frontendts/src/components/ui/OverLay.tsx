import React from 'react';

const OverLay: React.FC = () => {
	return (
		<div
			className="absolute inset-0 bg-slate-700/40 transition-opacity duration-300"
			aria-hidden="true"
		/>
	);
};

export default OverLay;