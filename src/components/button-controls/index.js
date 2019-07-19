import {
	BaseControl,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components'
import {
	ButtonIconPopoverControl,
	ColorPaletteControl,
	ControlSeparator,
	DesignControl,
	IconControl,
	TextToolbar,
	TypographyControlHelper,
	URLInputControl,
} from '@stackable/components'
import { __ } from '@wordpress/i18n'
import { applyFilters } from '@wordpress/hooks'
import { Fragment } from '@wordpress/element'
import { i18n } from 'stackable'
import ImageDesignBasic from './images/basic.png'
import ImageDesignGhost from './images/ghost.png'
import ImageDesignLink from './images/link.png'
import ImageDesignPlain from './images/plain.png'

const ButtonControls = props => {
	const design = props.design ? props.design : 'basic'
	const size = props.size ? props.size : 'normal'

	const showGradient = design === 'basic'

	return (
		<Fragment>
			{ props.onChangeUrl && (
				<URLInputControl
					label={ __( 'Link / URL', i18n ) }
					value={ props.url }
					onChange={ props.onChangeUrl }
					placeholder="http://"
				/>
			) }
			{ props.onChangeNewWindow && (
				<ToggleControl
					label={ __( 'Open link in new window', i18n ) }
					checked={ props.newWindow }
					onChange={ props.onChangeNewWindow }
				/>
			) }

			<ControlSeparator />

			{ props.onChangeDesign && (
				<DesignControl
					label={ __( 'Design', i18n ) }
					selected={ design }
					options={ [
						{
							label: __( 'Basic', i18n ), value: 'basic', image: ImageDesignBasic,
						},
						{
							label: __( 'Ghost', i18n ), value: 'ghost', image: ImageDesignGhost,
						},
						{
							label: __( 'Plain', i18n ), value: 'plain', image: ImageDesignPlain,
						},
						{
							label: __( 'Link', i18n ), value: 'link', image: ImageDesignLink,
						},
						...applyFilters( 'stackable.button.edit.designs', [] ),
					] }
					onChange={ props.onChangeDesign }
				/>
			) }

			{ props.onChangeBackgroundColor && design !== 'link' && (
				<ColorPaletteControl
					label={
						props.onChangeBackgroundColor2 && props.backgroundColorType === 'gradient' && showGradient ?
							__( 'Button Color #1', i18n ) :
							__( 'Button Color', i18n )
					}
					value={ props.backgroundColor }
					onChange={ props.onChangeBackgroundColor }
				/>
			) }

			{ props.onChangeTextColor && showGradient && (
				<ColorPaletteControl
					label={ __( 'Text Color', i18n ) }
					value={ props.textColor }
					onChange={ props.onChangeTextColor }
				/>
			) }

			{ props.hasAdvancedColors && design !== 'link' && (
				<ButtonIconPopoverControl
					label={ __( 'Adv. Color Settings', i18n ) }
					onReset={ props.onResetAdvancedColors }
					allowReset={
						props.backgroundColorType ||
						props.backgroundColor2 ||
						props.backgroundGradientDirection ||
						props.opacity
					}
				>
					{ props.onChangeBackgroundColorType && showGradient && (
						<BaseControl
							label={ __( 'Button Color Type', i18n ) }
						>
							<TextToolbar
								controls={ [
									{
										value: '',
										title: __( 'Single', i18n ),
										isActive: props.backgroundColorType === '',
										onClick: () => props.onChangeBackgroundColorType( '' ),
									},
									{
										value: 'gradient',
										title: __( 'Gradient', i18n ),
										isActive: props.backgroundColorType === 'gradient',
										onClick: () => props.onChangeBackgroundColorType( 'gradient' ),
									},
								] }
							/>
						</BaseControl>
					) }
					{ props.onChangeBackgroundColor && props.backgroundColorType === 'gradient' && showGradient && (
						<ColorPaletteControl
							label={
								props.onChangeBackgroundColor2 && props.backgroundColorType === 'gradient' && showGradient ?
									__( 'Button Color #1', i18n ) :
									__( 'Button Color', i18n )
							}
							value={ props.backgroundColor }
							onChange={ props.onChangeBackgroundColor }
						/>
					) }
					{ props.onChangeBackgroundColor2 && props.backgroundColorType === 'gradient' && showGradient && (
						<ColorPaletteControl
							label={ __( 'Button Color #2', i18n ) }
							value={ props.backgroundColor2 }
							onChange={ props.onChangeBackgroundColor2 }
						/>
					) }
					{ props.onChangeBackgroundColor2 && props.backgroundColorType === 'gradient' && showGradient && (
						<RangeControl
							label={ __( 'Gradient Direction (degrees)', i18n ) }
							value={ props.backgroundGradientDirection }
							onChange={ props.onChangeBackgroundGradientDirection }
							min={ 0 }
							max={ 360 }
							step={ 10 }
							allowReset={ true }
						/>
					) }
					{ props.onChangeOpacity && (
						<RangeControl
							label={ __( 'Opacity', i18n ) }
							value={ props.opacity }
							onChange={ props.onChangeOpacity }
							min={ 0.1 }
							max={ 1 }
							step={ 0.1 }
							allowReset={ true }
						/>
					) }
				</ButtonIconPopoverControl>
			) }

			{ design !== 'link' && <ControlSeparator /> }

			{ props.onChangeHoverGhostToNormal && design === 'ghost' && (
				<ToggleControl
					label={ __( 'Change to Normal Button on Hover', i18n ) }
					checked={ props.hoverGhostToNormal }
					onChange={ props.onChangeHoverGhostToNormal }
				/>
			) }

			{ props.onChangeHoverEffect && ( design !== 'plain' && design !== 'link' ) && (
				<SelectControl
					label={ __( 'Hover Effect', i18n ) }
					value={ props.hoverEffect }
					onChange={ props.onChangeHoverEffect }
					options={ [
						{ value: '', label: __( 'None', i18n ) },
						{ value: 'lift', label: __( 'Lift', i18n ) },
						{ value: 'scale', label: __( 'Scale', i18n ) },
						{ value: 'lift-scale', label: __( 'Lift & Scale', i18n ) },
					] }
				/>
			) }

			{ props.hasHoverColors && design !== 'link' && (
				<ButtonIconPopoverControl
					label={ __( 'Hover Colors', i18n ) }
					onReset={ props.onResetHoverColors }
					allowReset={
						props.hoverBackgroundColor ||
						props.hoverBackgroundColor2 ||
						props.hoverBackgroundGradientDirection ||
						props.hoverTextColor ||
						props.hoverOpacity
					}
				>
					{ props.onChangeHoverBackgroundColor && (
						<ColorPaletteControl
							label={
								props.onChangeHoverBackgroundColor && ( props.hoverGhostToNormal || ( props.backgroundColorType === 'gradient' && showGradient ) ) ?
									__( 'Button Color #1', i18n ) :
									__( 'Button Color', i18n )
							}
							value={ props.hoverBackgroundColor }
							onChange={ props.onChangeHoverBackgroundColor }
						/>
					) }
					{ props.onChangeHoverBackgroundColor2 && ( props.hoverGhostToNormal || ( props.backgroundColorType === 'gradient' && showGradient ) ) && (
						<ColorPaletteControl
							label={ __( 'Button Color #2', i18n ) }
							value={ props.hoverBackgroundColor2 }
							onChange={ props.onChangeHoverBackgroundColor2 }
						/>
					) }
					{ props.onChangeHoverBackgroundColor2 && ( props.hoverGhostToNormal || ( props.backgroundColorType === 'gradient' && showGradient ) ) && (
						<RangeControl
							label={ __( 'Gradient Direction (degrees)', i18n ) }
							value={ props.hoverBackgroundGradientDirection }
							onChange={ props.onChangeHoverBackgroundGradientDirection }
							min={ 0 }
							max={ 360 }
							step={ 10 }
							allowReset={ true }
						/>
					) }
					{ props.onChangeHoverTextColor && ( props.hoverGhostToNormal || showGradient ) && (
						<ColorPaletteControl
							label={ __( 'Text Color', i18n ) }
							value={ props.hoverTextColor }
							onChange={ props.onChangeHoverTextColor }
						/>
					) }
					{ props.onChangeOpacity && (
						<RangeControl
							label={ __( 'Opacity', i18n ) }
							value={ props.hoverOpacity }
							onChange={ props.onChangeHoverOpacity }
							min={ 0.1 }
							max={ 1 }
							step={ 0.1 }
							allowReset={ true }
						/>
					) }
				</ButtonIconPopoverControl>
			) }

			{ design !== 'link' && <ControlSeparator /> }

			{ props.hasTypography && design !== 'link' && (
				<TypographyControlHelper
					attrNameTemplate={ props.attrNameTemplate }
					setAttributes={ props.setAttributes }
					blockAttributes={ props.blockAttributes }
					onChangeFontSize={ null }
					onChangeLineHeight={ null }
				/>
			) }

			{ props.onChangeSize && ( props.onChangeDesign ? design !== 'link' : true ) &&
				<SelectControl
					label={ __( 'Size', i18n ) }
					value={ size }
					options={ [
						{ value: 'tiny', label: __( 'Tiny', i18n ) },
						{ value: 'small', label: __( 'Small', i18n ) },
						{ value: 'normal', label: __( 'Normal', i18n ) },
						{ value: 'medium', label: __( 'Medium', i18n ) },
						{ value: 'large', label: __( 'Large', i18n ) },
					] }
					onChange={ props.onChangeSize }
				/>
			}

			{ props.onChangeBorderWidth && design === 'ghost' &&
				<RangeControl
					label={ __( 'Border Width', i18n ) }
					value={ props.borderWidth }
					min="1"
					max="6"
					onChange={ props.onChangeBorderWidth }
					allowReset={ true }
				/>
			}

			{ props.onChangeBorderRadius && design !== 'link' && design !== 'plain' &&
				<RangeControl
					label={ __( 'Border Radius', i18n ) }
					value={ props.borderRadius }
					min="0"
					max="70"
					onChange={ props.onChangeBorderRadius }
					allowReset={ true }
				/>
			}

			{ props.onChangeShadow && ( design === '' || design === 'basic' ) &&
				<RangeControl
					label={ __( 'Shadow', i18n ) }
					value={ props.shadow }
					onChange={ props.onChangeShadow }
					min={ 0 }
					max={ 9 }
					allowReset={ true }
				/>
			}

			{ props.onChangeIcon && design !== 'link' &&
				<IconControl
					label={ __( 'Icon', i18n ) }
					value={ props.icon }
					onChange={ props.onChangeIcon }
				/>
			}

			{ props.hasAdvancedIcon && design !== 'link' && props.icon !== '' && (
				<ButtonIconPopoverControl
					label={ __( 'Adv. Icon Settings', i18n ) }
					onReset={ props.onResetAdvancedIcon }
					allowReset={ props.iconPosition || props.iconSpacing !== '' }
				>
					{ props.onChangeIconPosition &&
						<SelectControl
							label={ __( 'Icon Position', i18n ) }
							value={ props.iconPosition }
							options={ [
								{ value: '', label: __( 'Left', i18n ) },
								{ value: 'right', label: __( 'Right', i18n ) },
							] }
							onChange={ props.onChangeIconPosition }
						/>
					}
					{ props.onChangeIconSpacing && (
						<RangeControl
							label={ __( 'Icon Spacing', i18n ) }
							value={ props.iconSpacing }
							onChange={ props.onChangeIconSpacing }
							min={ 0 }
							max={ 50 }
							step={ 1 }
							allowReset={ true }
						/>
					) }
				</ButtonIconPopoverControl>
			) }
		</Fragment>
	)
}

ButtonControls.defaultProps = {
	// Used for typography.
	hasTypography: true,
	attrNameTemplate: '%s',
	setAttributes: () => {},
	blockAttributes: {},

	design: '',
	onChangeDesign: () => {},

	url: '',
	newWindow: '',
	onChangeUrl: () => {},
	onChangeNewWindow: () => {},

	size: '',
	onChangeSize: () => {},

	hasAdvancedColors: true,
	onResetAdvancedColors: () => {},
	opacity: '',
	textColor: '',
	backgroundColorType: '',
	backgroundColor: '',
	backgroundColor2: '',
	backgroundGradientDirection: '',
	onChangeOpacity: () => {},
	onChangeTextColor: () => {},
	onChangeBackgroundColorType: () => {},
	onChangeBackgroundColor: () => {},
	onChangeBackgroundColor2: () => {},
	onChangeBackgroundGradientDirection: () => {},

	hasHoverColors: true,
	onResetHoverColors: () => {},
	hoverEffect: '',
	hoverOpacity: '',
	hoverTextColor: '',
	hoverBackgroundColor: '',
	hoverBackgroundColor2: '',
	hoverBackgroundGradientDirection: '',
	hoverGhostToNormal: false,
	onChangeHoverEffect: () => {},
	onChangeHoverOpacity: () => {},
	onChangeHoverTextColor: () => {},
	onChangeHoverBackgroundColor: () => {},
	onChangeHoverBackgroundColor2: () => {},
	onChangeHoverBackgroundGradientDirection: () => {},
	onChangeHoverGhostToNormal: () => {},

	borderRadius: '',
	onChangeBorderRadius: () => {},
	borderWidth: '',
	onChangeBorderWidth: () => {},
	shadow: '',
	onChangeShadow: () => {},

	hasAdvancedIcon: true,
	onResetAdvancedIcon: () => {},
	icon: '',
	iconPosition: '',
	iconSpacing: '',
	onChangeIcon: () => {},
	onChangeIconPosition: () => {},
	onChangeIconSpacing: () => {},
}

export default ButtonControls
