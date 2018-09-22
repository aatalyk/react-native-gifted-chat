/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import moment from 'moment';

import Color from './Color';

import { isSameDay, isSameUser, warnDeprecated, formatDate } from './utils';
import { DATE_FORMAT } from './Constant';

export default function Day(
	{ dateFormat, currentMessage, previousMessage, containerStyle, wrapperStyle, textStyle, lang },
	context
) {
	if (!isSameDay(currentMessage, previousMessage)) {
		console.log(currentMessage.createdAt, lang);
		return (
			<View style={[styles.container, containerStyle]}>
				<View style={wrapperStyle}>
					<Text style={[styles.text, textStyle]}>
						{formatDate(new Date(currentMessage.createdAt), lang).toUpperCase()}
					</Text>
				</View>
			</View>
		);
	}
	return null;
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 5,
		marginBottom: 10
	},
	text: {
		backgroundColor: Color.backgroundTransparent,
		color: Color.defaultColor,
		fontSize: 12,
		fontWeight: '600'
	}
});

Day.contextTypes = {
	getLocale: PropTypes.func
};

Day.defaultProps = {
	lang: 'rus',
	currentMessage: {
		// TODO: test if crash when createdAt === null
		createdAt: null
	},
	previousMessage: {},
	containerStyle: {},
	wrapperStyle: {},
	textStyle: {},
	// TODO: remove in next major release
	isSameDay: warnDeprecated(isSameDay),
	isSameUser: warnDeprecated(isSameUser),
	dateFormat: DATE_FORMAT
};

Day.propTypes = {
	lang: PropTypes.string,
	currentMessage: PropTypes.object,
	previousMessage: PropTypes.object,
	containerStyle: ViewPropTypes.style,
	wrapperStyle: ViewPropTypes.style,
	textStyle: Text.propTypes.style,
	// TODO: remove in next major release
	isSameDay: PropTypes.func,
	isSameUser: PropTypes.func,
	dateFormat: PropTypes.string
};
