/**
 * Internal dependencies
 */
import createStyles from './style'

/**
 * External dependencies
 */
import { Style } from '~stackable/components'
import { withVersion } from '~stackable/higher-order'
import { version as VERSION } from 'stackable'
import classnames from 'classnames'

/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor'
import { compose } from '@wordpress/compose'

export const Save = props => {
	const {
		hasBackground,
	} = props.attributes

	const blockClassName = classnames( [
		'stk-card-group',
		'stk-block',
		`stk-${ props.attributes.uniqueId }`,
	], {
		'stk-block-background': hasBackground,
	} )

	const contentClassNames = classnames( [
		'stk-inner-blocks',
		'stk-row',
		'stk-block-content',
	] )

	return (
		<div className={ blockClassName } data-id={ props.attributes.uniqueId }>
			<Style.Content
				blockUniqueClassName={ `stk-${ props.attributes.uniqueId }` }
				blockMainClassName={ 'stk-card-group' }
				styleFunc={ createStyles( props.version ) }
				blockProps={ props }
			/>
			<div className={ contentClassNames }>
				<InnerBlocks.Content />
			</div>
		</div>
	)
}

export default compose(
	withVersion( VERSION )
)( Save )