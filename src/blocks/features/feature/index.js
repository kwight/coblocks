/**
 * Internal dependencies
 */
import { BackgroundAttributes } from '../../../components/background';
import DimensionsAttributes from '../../../components/dimensions-control/attributes';
import edit from './edit';
import icon from './icon';
import metadata from './block.json';
import save from './save';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';

/**
 * Block constants
 */
const { name, category } = metadata;

const attributes = {
	...DimensionsAttributes,
	...BackgroundAttributes,
	...metadata.attributes,
};

const settings = {
	title: _x( 'Feature', 'block name', 'coblocks' ),
	description: __( 'A singular child column within a parent features block.', 'coblocks' ),
	icon,
	parent: [ 'coblocks/features' ],
	supports: {
		inserter: false,
	},
	attributes,
	edit,
	save,
};

export { name, category, metadata, settings };
