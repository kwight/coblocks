/**
 * External dependencies
 */
import times from 'lodash/times';
import memoize from 'memize';
import Inspector from './inspector';

/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { Component, Fragment } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { IconButton } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';

/**
 * Allowed blocks and template constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change. HEAD
 * The array should contain the name of each block that is allowed.
 * In standout block, the only block we allow is 'core/list'.
 *
 * @constant
 * @type {string[]}
*/
const ALLOWED_BLOCKS = [ 'coblocks/accordion-item' ];

/**
 * Returns the layouts configuration for a given number of accordion items.
 *
 * @param {number} count Number of accordion items.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getCount = memoize( ( count ) => {
	return times( count, () => [ 'coblocks/accordion-item' ] );
} );

/**
 * Block edit function
 */
class Edit extends Component {
	render() {
		const {
			clientId,
			attributes,
			className,
			isSelected,
		} = this.props;

		const {
			count,
		} = attributes;

		const items = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId );

		return (
			<Fragment>
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<div className={ className }>
					<InnerBlocks
						template={ getCount( count ) }
						allowedBlocks={ ALLOWED_BLOCKS }
					/>
					{ isSelected && (
						<div className="components-coblocks-add-accordion-item">
							<IconButton
								isLarge
								className="block-editor-button-block-appender components-coblocks-add-accordion-item__button"
								label={ _x( 'Add Accordion Item', 'Add a child element for the Accordion block', 'coblocks' ) }
								icon="insert"
								onClick={ () => {
									if ( items[ 0 ].innerBlocks ) {
										const lastId = items[ 0 ].innerBlocks[ items[ 0 ].innerBlocks.length - 1 ].clientId;
										let copyAttributes = {};

										if ( lastId ) {
											const lastBlockClient 	= wp.data.select( 'core/block-editor' ).getBlockAttributes( lastId );
											if ( lastBlockClient.backgroundColor ) {
												copyAttributes = Object.assign( copyAttributes, {
													backgroundColor: lastBlockClient.backgroundColor,
												} );
											}

											if ( lastBlockClient.borderColor ) {
												copyAttributes = Object.assign( copyAttributes, {
													borderColor: lastBlockClient.borderColor,
												} );
											}

											if ( lastBlockClient.textColor ) {
												copyAttributes = Object.assign( copyAttributes, {
													textColor: lastBlockClient.textColor,
												} );
											}

											if ( lastBlockClient.customTextColor ) {
												copyAttributes = Object.assign( copyAttributes, {
													customTextColor: lastBlockClient.customTextColor,
												} );
											}
										}

										const created = createBlock( 'coblocks/accordion-item', copyAttributes );
										wp.data.dispatch( 'core/block-editor' ).insertBlock( created, undefined, clientId );
									}
								} } >
							</IconButton>
						</div>
					) }
				</div>
			</Fragment>
		);
	}
}

export default Edit;
