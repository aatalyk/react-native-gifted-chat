/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Keyboard, ViewPropTypes } from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import Color from './Color';

export default class InputToolbar extends React.Component {
	constructor(props) {
		super(props);

		this.keyboardWillShow = this.keyboardWillShow.bind(this);
		this.keyboardWillHide = this.keyboardWillHide.bind(this);

		this.state = {
			position: 'absolute'
		};
	}

	componentWillMount() {
		this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
		this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
	}

	componentWillUnmount() {
		this.keyboardWillShowListener.remove();
		this.keyboardWillHideListener.remove();
	}

	keyboardWillShow() {
		this.setState({
			position: 'relative'
		});
	}

	keyboardWillHide() {
		this.setState({
			position: 'absolute'
		});
	}

	renderActions() {
		if (this.props.renderActions) {
			return this.props.renderActions(this.props);
		} else if (this.props.onPressActionButton) {
			return <Actions {...this.props} />;
		}
		return null;
	}

	renderSendGuest() {
		if (this.props.renderSendGuest) {
			return this.props.renderSendGuest(this.props);
		}
		const { lang } = this.props;
		return (
			<Send
				{...this.props}
				onSend={this.props.onSendGuest}
				label={lang === 'kaz' ? 'Мен' : 'Я'}
				textStyle={{ color: 'rgb(227, 71, 111)' }}
			/>
		);
	}

	renderSend() {
		if (this.props.renderSend) {
			return this.props.renderSend(this.props);
		}
		const { lang } = this.props;
		return <Send {...this.props} label={lang === 'kaz' ? 'Сіз' : 'Вы'} />;
	}

	renderComposer() {
		if (this.props.renderComposer) {
			return this.props.renderComposer(this.props);
		}

		return <Composer {...this.props} />;
	}

	renderAccessory() {
		if (this.props.renderAccessory) {
			return (
				<View style={[styles.accessory, this.props.accessoryStyle]}>
					{this.props.renderAccessory(this.props)}
				</View>
			);
		}
		return null;
	}

	render() {
		return (
			<View style={[styles.container, this.props.containerStyle, { position: this.state.position }]}>
				<View style={[styles.primary, this.props.primaryStyle]}>
					{this.renderSendGuest()}
					{this.renderActions()}
					{this.renderComposer()}
					{this.renderSend()}
				</View>
				{this.renderAccessory()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderTopColor: Color.defaultColor,
		backgroundColor: Color.white,
		bottom: 0,
		left: 0,
		right: 0
	},
	primary: {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	accessory: {
		height: 44
	}
});

InputToolbar.defaultProps = {
	renderAccessory: null,
	renderActions: null,
	renderSend: null,
	renderSendGuest: null,
	renderComposer: null,
	containerStyle: {},
	primaryStyle: {},
	accessoryStyle: {},
	onPressActionButton: () => {}
};

InputToolbar.propTypes = {
	renderAccessory: PropTypes.func,
	renderActions: PropTypes.func,
	renderSend: PropTypes.func,
	renderSendGuest: PropTypes.func,
	renderComposer: PropTypes.func,
	onPressActionButton: PropTypes.func,
	containerStyle: ViewPropTypes.style,
	primaryStyle: ViewPropTypes.style,
	accessoryStyle: ViewPropTypes.style
};
