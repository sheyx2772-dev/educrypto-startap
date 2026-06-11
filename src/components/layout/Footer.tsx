export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-caption text-sm text-gray-500">
          © 2024 EduCrypto. Barcha huquqlar himoyalangan.
        </p>

        <div className="flex items-center gap-3 px-4 py-2 rounded-full border-2 border-secondary/20 bg-background">
          <div className="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center text-[8px] font-bold text-secondary text-center leading-tight">
            NAPP
          </div>
          <span className="text-xs text-gray-500 max-w-[180px]">
            NAPP tomonidan tasdiqlangan — O&apos;zbekiston regulyatori
          </span>
        </div>
      </div>
    </footer>
  );
}
