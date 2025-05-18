'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function SearchForm() {
  const isStorybook = process.env.STORYBOOK === 'true'

  const router = useRouter()
  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    active: '',
  })
  const [emailError, setEmailError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
      if (name === 'email') {
        setEmailError(value !== '' && !value.includes('@'));
      }
      setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (
    event: SelectChangeEvent<string>
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    params.set('page_index', '1') // 검색 시 항상 1페이지부터 시작
    params.set('page_size', searchParams.get('page_size') || '10')

    if (form.id) params.set('id', form.id)
    if (form.name) params.set('name', form.name)
    if (form.email) params.set('email', form.email)
    if (form.active) params.set('active', form.active)

    if (!isStorybook) {
      router?.push(`/?${params.toString()}`)
    }
  }

  const handleReset = () => {
    setForm({ id: "", name: "", email: "", active: "" });
    setEmailError(false);
    
    const params = new URLSearchParams();
    params.set("page_index", "1");
    params.set("page_size", searchParams.get("page_size") || "10");

    if (!isStorybook) {
      router?.push(`/?${params.toString()}`);
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={1}
      flexWrap="wrap"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: '#f8f8f8',
        borderRadius: 1,
        boxShadow: 1,
        width: 'fit-content',
        maxWidth: '100%',
      }}
    >
      <TextField
        label="사용자 ID"
        name="id"
        value={form.id}
        onChange={handleInputChange}
        size="small"
        sx={{ bgcolor: 'white' }}
      />
      <TextField
        label="이름"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        size="small"
        sx={{ bgcolor: 'white' , width: 150 }}
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        error={emailError}
        onChange={handleInputChange}
        size="small"
        sx={{ bgcolor: 'white' }}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>활성 상태</InputLabel>
        <Select
          name="active"
          value={form.active}
          onChange={handleSelectChange}
          label="활성 상태"
          sx={{ bgcolor: 'white' }}
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="1">활성</MenuItem>
          <MenuItem value="0">비활성</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" >
        조회
      </Button>
      <Button type="button" onClick={handleReset} variant="outlined" sx={{ bgcolor: 'white' }}>
        초기화
      </Button>
    </Box>
  )
}