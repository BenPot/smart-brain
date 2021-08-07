import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
				{boxes.map(box => {
					return(
						<div 
							className='bounding-box'
							style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
						</div>
					);
				})}
				
				{/*{  boxes.length > 0 ?
					<div 
						className='bounding-box'
						style={{top: boxes[0].topRow, right: boxes[0].rightCol, bottom: boxes[0].bottomRow, left: boxes[0].leftCol}}>
					</div>
					: 
					<div></div>
				}
				{  boxes.length > 1 ?
					<div 
						className='bounding-box'
						style={{top: boxes[1].topRow, right: boxes[1].rightCol, bottom: boxes[1].bottomRow, left: boxes[1].leftCol}}>
					</div>
					: 
					<div></div>
				}
				{ boxes.length > 2 ?
					<div 
						className='bounding-box'
						style={{top: boxes[2].topRow, right: boxes[2].rightCol, bottom: boxes[2].bottomRow, left: boxes[2].leftCol}}>
					</div>
					: 
					<div></div>
				}
				{ boxes.length > 3 ?
					<div 
						className='bounding-box'
						style={{top: boxes[3].topRow, right: boxes[3].rightCol, bottom: boxes[3].bottomRow, left: boxes[3].leftCol}}>
					</div>
					: 
					<div></div>
				}
				{ boxes.length > 4 ?
					<div 
						className='bounding-box'
						style={{top: boxes[4].topRow, right: boxes[4].rightCol, bottom: boxes[4].bottomRow, left: boxes[4].leftCol}}>
					</div>
					: 
					<div></div>
				}
				{ boxes.length > 5 ?
					<div 
						className='bounding-box'
						style={{top: boxes[5].topRow, right: boxes[5].rightCol, bottom: boxes[5].bottomRow, left: boxes[5].leftCol}}>
					</div>
					: 
					<div></div>
				}
				{ boxes.length > 3 ?
					<div 
						className='bounding-box'
						style={{top: boxes[3].topRow, right: boxes[3].rightCol, bottom: boxes[3].bottomRow, left: boxes[3].leftCol}}>
					</div>
					: 
					<div></div>
				}*/}
			</div>
		</div>
	);
}

export default FaceRecognition;