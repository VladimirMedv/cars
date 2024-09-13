'use client'

import { useState, Fragment } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react'
import { SearchManufacturerProps } from '@/types'
import Image from 'next/image'

import { manufacturers } from '@/constants'

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState('')

  const filteredManufacturers =
    query === ''
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className='search-manufacturer'>
      <Combobox
        value={manufacturer}
        onChange={setManufacturer}
      >
        <div className='relative w-full'>
          <ComboboxButton className={'absolute top-[14px]'}>
            <Image
              src='/car-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='Car Logo'
            />
          </ComboboxButton>

          <ComboboxInput
            className='search-manufacturer__input'
            placeholder='Volkswagen'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(event) => {
              setQuery(event.target.value)
            }}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <ComboboxOptions className='search-manufacturer__options'>
              {filteredManufacturers.map((item) => (
                <ComboboxOption
                  key={item}
                  value={item}
                  className={({ focus, selected }) =>
                    `relative search-manufacturer__option ${
                      selected ? 'bg-primary-blue text-white' : 'text-gray-900'
                    } ${focus && 'bg-primary-blue text-white'}`
                  }
                >
                  {item}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer
