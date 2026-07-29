$files = @('src\components\CustomDatePickerModal.tsx','src\components\CustomDropdownModal.tsx')
foreach ($f in $files) {
  $c = Get-Content $f -Raw
  $c = $c -replace "import FeatherIcon from '../components/FeatherIcon';", "import FeatherIcon from './FeatherIcon';"
  Set-Content $f $c -NoNewline
  Write-Host "Fixed: $f"
}
