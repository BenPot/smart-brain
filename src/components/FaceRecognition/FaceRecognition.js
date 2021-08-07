import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
				<div 
					className='bounding-box'
					style={{top: boxes[0].topRow, right: boxes[0].rightCol, bottom: boxes[0].bottomRow, left: boxes[0].leftCol}}>
				</div>
				<div 
					className='bounding-box'
					style={{top: boxes[1].topRow, right: boxes[1].rightCol, bottom: boxes[1].bottomRow, left: boxes[1].leftCol}}>
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;