"""
Script to convert Cabo Vírgenes product data from Excel to JSON.

This script reads an Excel workbook where each row represents a product or
sub‑product and outputs a JSON file with the same data structure.  By using
this script, you can edit the XLSX file as the single source of truth and
regenerate the corresponding JSON whenever you make changes.  The JSON is
useful for feeding data into a website or application.

Usage:
    python convert_xlsx_to_json.py input.xlsx output.json

If you omit the output path, the script will generate a file with the same
name as the input but with a .json extension.

Requirements:
    - Python 3.6+
    - pandas (for reading the Excel file)

You can install pandas via pip:
    pip install pandas openpyxl
"""

import json
import sys
from pathlib import Path

try:
    import pandas as pd
except ImportError:
    raise SystemExit("This script requires the pandas library. Install it with 'pip install pandas openpyxl'.")


def convert_excel_to_json(excel_path: str, json_path: str) -> None:
    """Read the Excel file and write its contents to a JSON file.

    Parameters
    ----------
    excel_path: str
        Path to the input Excel file.
    json_path: str
        Path where the output JSON will be written.
    """
    df = pd.read_excel(excel_path, dtype=str)
    # Replace NaN values with None to avoid serialisation issues
    df = df.where(pd.notnull(df), None)
    data = df.to_dict(orient='records')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Converted {excel_path} -> {json_path} ({len(data)} records)")


def main():
    if len(sys.argv) < 2:
        print("Usage: python convert_xlsx_to_json.py <input.xlsx> [<output.json>]")
        sys.exit(1)
    input_path = Path(sys.argv[1])
    if not input_path.exists():
        raise FileNotFoundError(f"Excel file not found: {input_path}")
    if len(sys.argv) >= 3:
        output_path = Path(sys.argv[2])
    else:
        output_path = input_path.with_suffix('.json')
    convert_excel_to_json(str(input_path), str(output_path))


if __name__ == '__main__':
    main()