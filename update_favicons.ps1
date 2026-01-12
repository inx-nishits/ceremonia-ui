$files = @(
    'c:\Projects\CeremonIA\views\dashboard.html',
    'c:\Projects\CeremonIA\views\onboarding\intro.html',
    'c:\Projects\CeremonIA\views\onboarding\start.html',
    'c:\Projects\CeremonIA\views\onboarding\questionnaire.html',
    'c:\Projects\CeremonIA\views\onboarding\filters.html',
    'c:\Projects\CeremonIA\views\ceremony\preview.html',
    'c:\Projects\CeremonIA\views\ceremony\generating.html',
    'c:\Projects\CeremonIA\views\ceremony\edit.html',
    'c:\Projects\CeremonIA\views\legal\legal-notice.html',
    'c:\Projects\CeremonIA\views\legal\terms-conditions.html'
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        if ($content -notmatch 'link rel="icon"') {
            $relativePath = if ($f -match 'dashboard.html') { '../assets' } else { '../../assets' }
            $tag = @"
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="$relativePath/images/favicon/favicon.png">
    <link rel="apple-touch-icon" href="$relativePath/images/favicon/favicon.png">
    <meta name="theme-color" content="#F9F8F6">
"@
            $newContent = $content -replace '</title>', ("</title>`n" + $tag)
            Set-Content $f -Value $newContent
            Write-Host "Updated $f"
        } else {
            Write-Host "Skipping $f (already has icon)"
        }
    } else {
        Write-Host "File not found: $f"
    }
}
