import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES } from '../../i18n/index'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.resolvedLanguage

  return (
    <div className="flex items-center gap-0.5 border border-white/[0.08] rounded-lg p-0.5">
      {SUPPORTED_LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`text-[11px] font-semibold px-2 py-1 rounded-md transition-all duration-150 ${
            current === code
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              : 'text-gray-600 hover:text-gray-300 hover:bg-white/[0.04]'
          }`}
          aria-pressed={current === code}
          aria-label={`Switch language to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
