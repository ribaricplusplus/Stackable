import { applyFilters } from '@wordpress/hooks'
import classnames from 'classnames'
import { getPlayButton } from './util'

const save = props => {
	const { className } = props
	const {
		videoID,
		playButtonType,
		playButtonColor = '#ffffff',
		backgroundImageURL,
		backgroundColor,
		backgroundOpacity,
		design = 'basic',
		borderRadius = 12,
		shadow = 3,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'ugb-video-popup',
		'ugb-video-popup--v2',
		`ugb-video-popup--design-${ design }`,
		`ugb-video-popup--button-${ playButtonType }`,
		'ugb--background-opacity-' + ( 1 * Math.round( backgroundOpacity / 1 ) ),
	], applyFilters( 'stackable.video-popup.mainclasses', {
		'ugb--has-background': backgroundColor || backgroundImageURL,
		'ugb--has-background-image': backgroundImageURL,
		[ `ugb--shadow-${ shadow }` ]: design !== 'plain' && shadow !== 3,
	}, design, props ) )

	const mainStyle = {
		backgroundColor: backgroundColor ? backgroundColor : undefined,
		backgroundImage: backgroundImageURL ? `url(${ backgroundImageURL })` : undefined,
		'--ugb-background-color': backgroundImageURL ? backgroundColor : undefined,
		borderRadius: design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
	}

	return (
		<div className={ mainClasses } style={ mainStyle } data-video={ videoID }>
			{ applyFilters( 'stackable.video-popup.save.output.before', null, design, props ) }
			<div className="ugb-video-popup__wrapper" >
				{ /* eslint-disable-next-line */ }
				<a href="#" className="ugb-video-popup__overlay" />
				<span className="ugb-video-popup__play-button">
					{ getPlayButton( playButtonType, playButtonColor ) }
				</span>
			</div>
			{ applyFilters( 'stackable.video-popup.save.output.after', null, design, props ) }
		</div>
	)
}

export default save
