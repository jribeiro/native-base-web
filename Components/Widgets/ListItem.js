/* @flow */
'use strict';
import PropTypes from 'prop-types';

import React from 'react';
import {Image, TouchableWithoutFeedback } from 'react-native';
import Platform from '../../Utils/platform';
import NativeBaseComponent from '../Base/NativeBaseComponent';
import computeProps from '../../Utils/computeProps';
import Icon from './Icon';
import Text from './Text';
import View from './View';
import Button from './Button';
import Badge from './Badge';
import Thumbnail from './Thumbnail';
import CheckBox from './Checkbox';
import Radio from './Radio';
import InputGroup from './InputGroup';
import TouchableOpacityScrollable from './TouchableOpacityScrollable';
import _ from 'lodash';

export default class ListItemNB extends NativeBaseComponent {

    static propTypes = {
        style : PropTypes.object,
        header : PropTypes.bool,
        iconRight : PropTypes.bool,
        iconLeft : PropTypes.bool,
        button : PropTypes.bool,
        itemDivider : PropTypes.bool
    }

    getInitialStyle() {

        return {
            listItem: {
                borderBottomWidth: this.getTheme().borderWidth,
                marginLeft: 15,
                padding:  this.inputPresent() ? 0 : this.getTheme().listItemPadding,
                paddingLeft: 2,
                justifyContent: ((this.props.iconRight && !this.props.iconLeft) || (this.props.iconRight && this.props.iconLeft)) ? 'space-between' : 'flex-start',
                flexDirection: this.stackedPresent() ? 'column' : 'row',
                alignItems: 'center',
                borderColor: this.props.hideBorder ? 'transparent' : ((this.inputPresent() && !this.inlinePresent() ) ? 'transparent' : this.getTheme().listBorderColor)
            },
            listItemDivider: {
                borderBottomWidth: this.getTheme().borderWidth,
                padding: this.getTheme().listItemPadding,
                backgroundColor: this.getTheme().listDividerBg,
                justifyContent: (this.buttonPresent()) ? 'space-between' : 'flex-start',
                flexDirection: 'row',
                borderColor: this.getTheme().listBorderColor
            },
            itemText: {
                fontSize: 16,
                marginLeft: (this.props.iconLeft) ? 10 : 0,
                color: this.getContextForegroundColor()
            },
            dividerItemText: {
                fontSize: 16,
                fontWeight: '500'
            },
            itemIcon: {
                fontSize: this.getTheme().iconFontSize,
                color: this.getContextForegroundColor(),
                lineHeight: (Platform.OS === 'ios') ? 34 : undefined
            },
            itemNote: {
                fontSize: this.getTheme().listNoteSize,
                color: this.getTheme().listNoteColor,
                alignSelf: 'center',
                fontWeight: '100',
                flex: 1,
                textAlign: 'right'
            },
            itemSubNote: {
                fontSize: this.getTheme().listNoteSize,
                color: this.getTheme().listNoteColor,
                lineHeight: 16
            },
            thumbnail: {
                alignSelf: 'center'
            },
            fullImage: {
                width: 300,
                height: 300
            },
            itemButton: {}

        }
    }

    getRightStyle() {
        return {
            right : {
                flex: 1,
                paddingLeft: 10

            },
            right2 : {
                flex: 1,
                flexDirection: 'row',
                paddingLeft: 10,
                alignItems: 'center',
                justifyContent: 'space-between'

            },
            right3 : {
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 10,
                alignSelf: 'flex-start'

            }
        }
    }

    thumbnailPresent() {
        var thumbnailComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == Thumbnail)
                thumbnailComponentPresent = true;
        })

        return thumbnailComponentPresent;
    }

    checkBoxPresent() {
        var checkBoxComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == CheckBox)
                checkBoxComponentPresent = true;
        })

        return checkBoxComponentPresent;
    }

    radioPresent() {
        var radioComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == Radio)
                radioComponentPresent = true;
        })

        return radioComponentPresent;
    }

    iconPresent() {
        var iconComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == Icon)
                iconComponentPresent = true;
        })

        return iconComponentPresent;
    }
    badgePresent() {
        var badgeComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == Badge)
                badgeComponentPresent = true;
        })

        return badgeComponentPresent;
    }

    inputPresent() {
        var inputComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == InputGroup)
                inputComponentPresent = true;
        })
        return inputComponentPresent;
    }

    buttonPresent() {
        var buttonComponentPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == Button)
                buttonComponentPresent = true;
        })

        return buttonComponentPresent;
    }

    getChildProps(child) {
        var defaultProps = {};

        if(child.type == Image && !Array.isArray(this.props.children)) {
            defaultProps = {
                resizeMode: 'stretch',
                style: this.getInitialStyle().fullImage
            }
        }
        else if(child.type == Button) {
            defaultProps = {
                small: true,
                style: this.getInitialStyle().itemButton
            }
        }
        else if(child.type == InputGroup) {

            defaultProps = {
                style: {
                    borderColor:(this.props.children.props.success) ?
                                this.getTheme().inputSuccessBorderColor :
                                (this.props.children.props.error) ?
                                this.getTheme().inputErrorBorderColor :
                                this.getTheme().listBorderColor
                },
                //foregroundColor: this.getContextForegroundColor()
            }
        }
        else if(child.type == Text) {
            if (this.props.itemDivider) {
                defaultProps = {
                    style: this.getInitialStyle().dividerItemText
                }
            } else {
                if(child.props.note && this.thumbnailPresent()) {
                    defaultProps = {
                        style: this.getInitialStyle().itemSubNote
                    }
                }
                else if(child.props.note) {
                    defaultProps = {
                        style: this.getInitialStyle().itemNote
                    }
                }
                else {
                    defaultProps = {
                        style: this.getInitialStyle().itemText
                    }
                }

            }
        }
        else if(child.type == Icon) {
            defaultProps = {
                style: this.getInitialStyle().itemIcon
            }
        }
        else if(child.type == Thumbnail) {
            defaultProps = {
                style: this.getInitialStyle().thumbnail
            }
        }
        else {
            defaultProps = {
                //foregroundColor: this.getContextForegroundColor()
            }
        }
        return computeProps(child.props, defaultProps);
    }

    prepareRootProps() {
        var defaultProps = {};

        if(this.props.itemDivider) {
            defaultProps = {
                style: this.getInitialStyle().listItemDivider
            };
        }
        else {
            defaultProps = {
                style: this.getInitialStyle().listItem
            };
        }

        return computeProps(this.props, defaultProps);
    }


    notePresent() {

        var notePresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == Text && child.props.note)
                notePresent = true;
        })
        return notePresent;

    }

    insetPresent() {

        var insetPresent = false;
        React.Children.forEach(this.props.children, function (child) {
            if(child.type == InputGroup && child.props.inset)
                insetPresent = true;
        })

        return insetPresent;

    }


    inlinePresent() {
        var inlineComponentPresent = false;
        if (this.inputPresent()) {
            if (this.props.children.props.children.props && this.props.children.props.children.props.inlineLabel) {
                inlineComponentPresent = true;
            }
            else
                inlineComponentPresent = false;
        }
        return inlineComponentPresent;
    }

    stackedPresent() {
        var stackedComponentPresent = false;
        if (this.inputPresent()) {
            if (this.props.children.props.children.props && this.props.children.props.children.props.stackedLabel) {
                stackedComponentPresent = true;
            }
            else
                stackedComponentPresent = false;
        }

        return stackedComponentPresent;
    }



    squareThumbs() {
        var squareThumbs = false;
        if (this.thumbnailPresent()) {
            React.Children.forEach(this.props.children, function (child) {
                if(child.props.square)
                    squareThumbs = true;
            })

        }
        return squareThumbs;

    }

    renderChildren() {
        return this.renderChildren20();
    }

    renderChildren20() {
        return <View>{this.props.children}</View>;
    }

    renderChildren10() {

        var newChildren = [];
        if(!Array.isArray(this.props.children) && !this.inlinePresent() && !this.stackedPresent() && !this.insetPresent()) {
            newChildren.push(
                <View key='listItem' style={{alignSelf: 'stretch', flex:1}}>
                {React.cloneElement(this.props.children, this.getChildProps(this.props.children))}
                </View>
            );
        }


        else {
            var childrenArray = React.Children.toArray(this.props.children);
            var iconElement = [];

            if (this.props.iconLeft && !this.props.iconRight) {

                iconElement = _.remove(childrenArray, function(item) {
                    if(item.type == Icon) {
                        return true;
                    }
                });
                newChildren.push(React.cloneElement(iconElement[0], {...this.getChildProps(iconElement[0]), key: 'listItem0'}));
                newChildren.push(<View key='listItem1' style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
            }
            else if (this.props.iconRight && !this.props.iconLeft) {

                iconElement = _.remove(childrenArray, function(item) {
                    if(item.type == Icon) {
                        return true;
                    }
                });

                newChildren.push(<View key='listItem0' >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
                newChildren.push(React.cloneElement(iconElement[0], {...this.getChildProps(iconElement[0]), key: 'listItem1'}));
            }
            else if (this.badgePresent()) {

                var badgeElement = _.remove(childrenArray, function(item) {
                    if(item.type == Badge) {
                        return true;
                    }
                });

                newChildren.push(<View key='listItem0' >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
                newChildren.push(React.cloneElement(badgeElement[0], {...this.getChildProps(badgeElement[0]), key: 'listItem1'}));
            }
            else if (this.props.iconRight && this.props.iconLeft) {

                iconElement = _.filter(childrenArray, function(item) {
                    if(item.type == Icon) {
                        return true;
                    }
                });

                newChildren.push(<View key='listItem0' style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
                    {childrenArray.slice(0,2).map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
                newChildren.push(React.cloneElement(iconElement[1], {...this.getChildProps(iconElement[1]), key: 'listItem1'}));
            }

            else if (this.thumbnailPresent()) {

                iconElement = _.remove(childrenArray, function(item) {
                    if(item.type == Thumbnail) {
                        return true;
                    }
                });
                newChildren.push(React.cloneElement(iconElement[0], {...this.getChildProps(iconElement[0]), key: 'listItem0'}));
                newChildren.push(<View key='listItem1' style={{flexDirection: 'column', paddingLeft: 15, alignSelf: (this.squareThumbs()) ? 'flex-start' : 'center', flex: 1 }} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
            }
            else if (this.checkBoxPresent()) {

                iconElement = _.remove(childrenArray, function(item) {
                    if(item.type == CheckBox) {
                        return true;
                    }
                });
                newChildren.push(React.cloneElement(iconElement[0], this.getChildProps(iconElement[0])));
                newChildren.push(<View key='listItem1' style={{flexDirection: 'column', paddingLeft: 15, alignSelf: (this.squareThumbs()) ? 'flex-start' : 'center', flex: 1 }} >
                    {childrenArray.map((child) => {
                        return React.cloneElement(child, this.getChildProps(child));
                    })}
                    </View>);
            }
            else if (this.radioPresent()) {

                iconElement = _.remove(childrenArray, function(item) {
                    if(item.type == Radio) {
                        return true;
                    }
                });
                newChildren.push(<View key='listItem1' style={{flexDirection: 'column', alignSelf: (this.squareThumbs()) ? 'flex-start' : 'center', flex: 1 }} >
                    {childrenArray.map((child) => {
                        return React.cloneElement(child, this.getChildProps(child));
                    })}
                    </View>);
                newChildren.push(React.cloneElement(iconElement[0], this.getChildProps(iconElement[0])));
            }
            else if (this.inputPresent() && !this.inlinePresent() && !this.stackedPresent() && !this.insetPresent()) {


                newChildren.push(<View key='listItem0' style={{flexDirection: 'column', alignSelf: 'center', flex: 1 }} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
            }
            else if (this.inlinePresent()) {

                newChildren.push(<View key='listItem0' style={{flexDirection: 'row', justifyContent: 'center', flex: 1, borderColor: this.getTheme().listBorderColor, alignItems: 'center', height: this.getTheme().inputHeightBase }} >
                    <Text style={{color: this.getTheme().inputColorPlaceholder }}>{this.props.children.props.children.props.label}</Text>
                    </View>);
                newChildren.push(<View key='listItem1' style={{flexDirection: 'column', alignSelf: 'center', flex: 2.2 }} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i, style:{borderWidth: 0}});
                    })}
                    </View>);
            }
            else if (this.stackedPresent()) {

                newChildren.push(<View key='listItem0' style={{flexDirection: 'row', justifyContent: 'flex-start', alignSelf: 'stretch', alignItems: 'center', height: this.getTheme().inputHeightBase, paddingLeft: 10 }} >
                    <Text style={{color: this.getTheme().inputColorPlaceholder, textAlign: 'left', fontSize: 15 }}>{this.props.children.props.children.props.label}</Text>
                    </View>);
                newChildren.push(<View key='listItem1' style={{flexDirection: 'row', alignSelf: 'stretch', flex: 1 , padding: 0}} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i, style:{flex:1}});
                    })}
                    </View>);
            }
            else if (this.insetPresent()) {


                newChildren.push(<View key='listItem0' style={{flexDirection: 'row', alignSelf: 'stretch', flex: 1 , padding: 0}} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
                newChildren.push(<View key='listItem1' style={{flexDirection: 'row', alignSelf: 'stretch', flex: 1 , padding: 0}} >
                    {childrenArray.map((child, i) => {
                        return React.cloneElement(child, {...this.getChildProps(child), key: i});
                    })}
                    </View>);
            }
        }

        return newChildren;
    }

    render() {
        if (this.props.menuItem) {
            return(
                <View style={{
                    backgroundColor : this.isItemPressIn ? '#eee' : 'white'
                }}>
                    <TouchableOpacityScrollable {...this.prepareRootProps()} activeOpacity={ (this.props.button) ? 0.2 : 1}
                        onPressIn={()=>{
                            this.isItemPressIn = true;
                            this.forceUpdate();
                        }}
                        onPressOut={()=>{
                            this.isItemPressIn = false;
                            this.forceUpdate();
                        }}>
                        {this.renderChildren()}
                    </TouchableOpacityScrollable>
                </View>
            );
        } else if (this.stackedPresent()) {
            return(
                <View {...this.prepareRootProps()} >
                    {this.renderChildren()}
                </View>
            );
        } else {
            return(
                <TouchableOpacityScrollable {...this.prepareRootProps()} activeOpacity={ (this.props.button) ? 0.2 : 1} >
                    {this.renderChildren()}
                </TouchableOpacityScrollable>
            );
        }
    }

}
