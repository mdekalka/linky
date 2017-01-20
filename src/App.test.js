import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


const AddCounter = (list) => {

  return list.concat([1])
}


it('no mutations', () => {
  const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [1];

    deepFreeze(listBefore)

    expect(AddCounter(listBefore)).toEqual(listAfter);
  }

  testAddCounter();
});


it('no mutation in posts', ()=> {
    const toggleFetching = (post) => {
        return { ...post, isFetching: false }
    };


    const postsBefore = {
        items: [1,2],
        isFetching: true,
        errorMessage: null,
        activePost: {}
    };

    const postsAfter = {
        items: [1,2],
        isFetching: false,
        errorMessage: null,
        activePost: {}
    };

    deepFreeze(postsBefore);
    expect(toggleFetching(postsBefore)).toEqual(postsAfter);
});


it ('no mutation in single post', () => {

    const postBefore = {
        _id: {
            $oid: 1
        },
        isFavourite: false,
        tags: [1,2,3],
        title: 'Super title post'
    };

    const postAfter = {
        _id: {
            $oid: 1
        },
        isFavourite: true,
        isFetching: false,
        tags: [1,2,3],
        title: 'Super title post'
    };

    const togglePost = (post) => {
        const additional = {
            isFavourite: true
        };

        return  { ...post, ...additional, isFetching: false };
    };

    deepFreeze(postBefore);
    expect(togglePost(postBefore)).toEqual(postAfter);
    console.log(postAfter)
});