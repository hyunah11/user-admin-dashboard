'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

export default function SearchForm() {
  const isStorybook = process.env.STORYBOOK === 'true'
  const router = !isStorybook ? useRouter() : null

  const searchParams = useSearchParams()

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    active: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
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

    router?.push(`/?${params.toString()}`)
  }

  const handleReset = () => {
    setForm({ id: "", name: "", email: "", active: "" });
    const params = new URLSearchParams();
    params.set("page_index", "1");
    params.set("page_size", searchParams.get("page_size") || "10");
    router?.push(`/?${params.toString()}`);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} flexWrap="wrap" mb={3} alignItems="flex-end">
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
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleInputChange}
        size="small"
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>활성 상태</InputLabel>
        <Select
          name="active"
          value={form.active}
          onChange={handleSelectChange}
          label="활성 상태"
        >
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="1">활성</MenuItem>
          <MenuItem value="0">비활성</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        조회
      </Button>
      <Button type="button" onClick={handleReset} variant="outlined">
        초기화
      </Button>
    </Box>
  )
}