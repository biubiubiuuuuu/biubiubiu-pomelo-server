/**
 * Created by Nemo on 15/5/19.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

var CommentSchema = new Schema({

  room: {type: String, index: true, description: '内容'},

  text: {type: String, description: '内容'},

  mode: {type: Number, description: '语音时长，单位为秒，这个属性只有语音消息有'},

  color: {type: String, description: ''},

  size: {type: Number, description: '语音时长，单位为秒，这个属性只有语音消息有'},
  stime: {type: Number, description: '语音时长，单位为秒，这个属性只有语音消息有'},

  date: {type: Date, default: Date.now(), description: '创建时间'}
});


var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;