import {
  FileCode,
  FileJson,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileTerminal,
  FileCog,
  File,
  type LucideProps,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>

interface FileIconDef {
  Icon: LucideIcon
  className: string
}

const EXT_MAP: Record<string, FileIconDef> = {
  // TypeScript / JavaScript
  ts:    { Icon: FileCode, className: 'text-blue-400' },
  tsx:   { Icon: FileCode, className: 'text-blue-400' },
  js:    { Icon: FileCode, className: 'text-yellow-400' },
  jsx:   { Icon: FileCode, className: 'text-yellow-400' },
  mjs:   { Icon: FileCode, className: 'text-yellow-400' },
  cjs:   { Icon: FileCode, className: 'text-yellow-400' },

  // Python
  py:    { Icon: FileCode, className: 'text-emerald-400' },
  pyi:   { Icon: FileCode, className: 'text-emerald-400' },

  // Swift / Kotlin / Java
  swift: { Icon: FileCode, className: 'text-orange-400' },
  kt:    { Icon: FileCode, className: 'text-violet-400' },
  java:  { Icon: FileCode, className: 'text-red-400' },

  // Web
  html:  { Icon: FileCode, className: 'text-orange-400' },
  css:   { Icon: FileCode, className: 'text-pink-400' },
  scss:  { Icon: FileCode, className: 'text-pink-400' },
  less:  { Icon: FileCode, className: 'text-pink-400' },
  vue:   { Icon: FileCode, className: 'text-emerald-400' },
  svelte:{ Icon: FileCode, className: 'text-orange-400' },

  // Data
  json:  { Icon: FileJson, className: 'text-teal-400' },
  yaml:  { Icon: FileCog,  className: 'text-purple-400' },
  yml:   { Icon: FileCog,  className: 'text-purple-400' },
  toml:  { Icon: FileCog,  className: 'text-orange-300' },
  env:   { Icon: FileCog,  className: 'text-gray-400' },
  xml:   { Icon: FileCode, className: 'text-orange-300' },
  csv:   { Icon: FileText, className: 'text-green-400' },

  // Docs / Text
  md:    { Icon: FileText, className: 'text-slate-300' },
  mdx:   { Icon: FileText, className: 'text-slate-300' },
  txt:   { Icon: FileText, className: 'text-gray-400' },
  pdf:   { Icon: FileText, className: 'text-red-400' },

  // Images
  png:   { Icon: FileImage, className: 'text-green-400' },
  jpg:   { Icon: FileImage, className: 'text-green-400' },
  jpeg:  { Icon: FileImage, className: 'text-green-400' },
  gif:   { Icon: FileImage, className: 'text-green-400' },
  svg:   { Icon: FileImage, className: 'text-green-400' },
  ico:   { Icon: FileImage, className: 'text-green-400' },
  webp:  { Icon: FileImage, className: 'text-green-400' },

  // Media
  mp4:   { Icon: FileVideo, className: 'text-purple-400' },
  mov:   { Icon: FileVideo, className: 'text-purple-400' },
  mp3:   { Icon: FileAudio, className: 'text-pink-400' },
  wav:   { Icon: FileAudio, className: 'text-pink-400' },

  // Archives
  zip:   { Icon: FileArchive, className: 'text-yellow-400' },
  tar:   { Icon: FileArchive, className: 'text-yellow-400' },
  gz:    { Icon: FileArchive, className: 'text-yellow-400' },

  // Shell / Config
  sh:    { Icon: FileTerminal, className: 'text-green-300' },
  bash:  { Icon: FileTerminal, className: 'text-green-300' },
  zsh:   { Icon: FileTerminal, className: 'text-green-300' },
  fish:  { Icon: FileTerminal, className: 'text-green-300' },

  // Other code
  rs:    { Icon: FileCode, className: 'text-orange-400' },
  go:    { Icon: FileCode, className: 'text-cyan-400' },
  rb:    { Icon: FileCode, className: 'text-red-400' },
  php:   { Icon: FileCode, className: 'text-violet-400' },
  cs:    { Icon: FileCode, className: 'text-purple-400' },
  cpp:   { Icon: FileCode, className: 'text-blue-300' },
  c:     { Icon: FileCode, className: 'text-blue-300' },
}

const FULL_NAME_MAP: Record<string, FileIconDef> = {
  Dockerfile:     { Icon: FileCog, className: 'text-sky-400' },
  Makefile:       { Icon: FileCog, className: 'text-gray-400' },
  '.gitignore':   { Icon: FileCog, className: 'text-gray-500' },
  '.eslintrc':    { Icon: FileCog, className: 'text-purple-400' },
  '.prettierrc':  { Icon: FileCog, className: 'text-pink-400' },
  '.env':         { Icon: FileCog, className: 'text-gray-400' },
  '.env.example': { Icon: FileCog, className: 'text-gray-400' },
}

const FALLBACK: FileIconDef = { Icon: File, className: 'text-gray-500' }

export function getFileIcon(name: string): FileIconDef {
  if (FULL_NAME_MAP[name]) return FULL_NAME_MAP[name]

  const dotIdx = name.lastIndexOf('.')
  if (dotIdx !== -1) {
    const ext = name.slice(dotIdx + 1).toLowerCase()
    if (EXT_MAP[ext]) return EXT_MAP[ext]
  }
  return FALLBACK
}
