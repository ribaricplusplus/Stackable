/**
 * BLOCK: Icon List Block.
 */

import { disabledBlocks, i18n } from 'stackable'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import { createTypographyAttributes } from '@stackable/util'
import deprecated from './deprecated'
import edit from './edit'
import { IconListIcon } from '@stackable/icons'
import save from './save'

export const schema = {
	icon: {
		type: 'string',
		default: 'check',
	},
	iconShape: {
		type: 'string',
	},
	iconColor: {
		type: 'string',
	},
	iconSize: {
		type: 'number',
		default: 20,
	},
	columns: {
		type: 'number',
		default: 1,
	},
	tabletColumns: {
		type: 'number',
		default: '',
	},
	mobileColumns: {
		type: 'number',
		default: '',
	},
	text: {
		source: 'html',
		selector: 'ul',
		multiline: 'li',
		default: '',
	},
	displayAsGrid: {
		type: 'boolean',
		default: false,
	},
	gap: {
		type: 'number',
		default: 16,
	},
	listTextColor: {
		type: 'string',
		default: '',
	},
	...createTypographyAttributes( 'listText%s' ),
}

export const name = 'ugb/icon-list'

export const settings = {
	title: __( 'Icon List', i18n ),
	description: __( 'An unordered list with icons. You can use this as a list of features or benefits.', i18n ),
	icon: IconListIcon,
	category: 'stackable',
	keywords: [
		__( 'Icon List', i18n ),
		__( 'Stackable', i18n ),
	],
	attributes: schema,
	supports: {
		inserter: ! disabledBlocks.includes( name ), // Hide if disabled.
	},

	deprecated,
	edit,
	save,

	// Stackable modules.
	modules: {
		'advanced-block-spacing': true,
		// 'advanced-column-spacing': true,
		'advanced-responsive': true,
		'block-background': true,
		'block-separators': true,
		'block-title': true,
		'content-align': true,
		'custom-css': {
			default: applyFilters( 'stackable.icon-list.custom-css.default', '' ),
		},
	},

	// Stackable specific settings.
	sDemoURL: 'https://wpstackable.com/icon-list-block/?utm_source=welcome&utm_medium=settings&utm_campaign=view_demo&utm_content=demolink',
}
