/* eslint-disable no-unused-vars */
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTimesCircle,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  InputGroup,
  Button,
  FormControl,
  Form,
} from 'react-bootstrap';

library.add(
  faTimesCircle,
  faSearch
)

function SearchBar(props) {
  const {
    onChange,
    searchPattern,
    onSearchBarClear
  } = props;

  const SearchIconButton = () => {
    return (
      <InputGroup.Prepend>
        <InputGroup.Text
          className='border-0 bg-transparent pl-2 pr-0'
          style={{
            borderTopLeftRadius: '0.3em',
            borderBottomLeftRadius: '0.3em',
            color: '#aaa'
          }}
        >
          <FontAwesomeIcon
            icon={faSearch}
          />
        </InputGroup.Text>
      </InputGroup.Prepend>
    );
  }

  const SearchBarClearButton = () => {
    if(searchPattern) {
      return (
        <InputGroup.Append>
          <Button
            className='border-0 shadow-none bg-0'
            variant='outline-success'
            onClick={onSearchBarClear}
            style={{
              borderTopRightRadius: '0.3em',
              borderBottomRightRadius: '0.3em',
            }}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
            />
          </Button>
        </InputGroup.Append>
      );
    } else {
      return null;
    }
  }

    return (
      <Form
        inline
        className='searchBarForm'
      >
        <InputGroup
          className='w-100'
        >
          <SearchIconButton />
          <FormControl
            type='text'
            placeholder='搜索日志'
            name='search'
            value={searchPattern}
            onChange={e => onChange(e)}
            className='bg-transparent border-0 shadow-none'
          />
          <SearchBarClearButton />
        </InputGroup>
      </Form>
  );
}

export default SearchBar;
