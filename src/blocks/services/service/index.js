/**
 * Styles.
 */
import './styles/editor.scss';
import './styles/style.scss';

/**
 * Internal dependencies.
 */
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies.
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants.
 */
const { name, category, attributes } = metadata;

const settings = {
	title: _x( 'Service', 'block name', 'coblocks' ),
	description: __( 'A single service item within a services block.', 'coblocks' ),
	icon,
	keywords: [],
	supports: {
		reusable: false,
		html: false,
		inserter: false,
	},
	example: {
		attributes: {},
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
