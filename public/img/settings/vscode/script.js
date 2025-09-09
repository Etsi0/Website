const fs = require('fs');
const path = require('path');
const os = require('os');

// Default paths
const BASE_PROJECT_DIR = path.join(os.homedir(), 'Documents', 'Desktop', 'Projects', 'phadonia');
const DEFAULT_JSON_OUTPUT = path.join(BASE_PROJECT_DIR, 'src', 'json', 'settings', 'vscode');
const DEFAULT_IMG_OUTPUT = path.join(BASE_PROJECT_DIR, 'public', 'img', 'settings', 'vscode');

function copyImage(sourcePath, destPath, extensionName) {
	try {
		if (!fs.existsSync(sourcePath)) {
			return null;
		}

		// Create destination directory if it doesn't exist
		const destDir = path.dirname(destPath);
		if (!fs.existsSync(destDir)) {
			fs.mkdirSync(destDir, { recursive: true });
		}

		fs.copyFileSync(sourcePath, destPath);
		return path.basename(destPath);
	} catch (error) {
		console.error(`Error copying icon for ${extensionName}:`, error.message);
		return null;
	}
}

function resolveLocalizationString(value, extensionPath) {
	// Check if it's a localization placeholder (starts and ends with %)
	if (typeof value === 'string' && value.startsWith('%') && value.endsWith('%')) {
		const key = value.slice(1, -1); // Remove % characters

		// Try to read localization files in order of preference
		const l10nPath = path.join(extensionPath, 'l10n');
		const possibleBundlePaths = [
			path.join(l10nPath, 'bundle.l10n.json'),        // Default/base bundle
			path.join(l10nPath, 'bundle.l10n.en.json'),     // English bundle
			path.join(extensionPath, 'package.nls.json'),   // Older localization system
			path.join(extensionPath, 'package.nls.en.json') // Older English localization
		];

		for (const bundlePath of possibleBundlePaths) {
			try {
				if (fs.existsSync(bundlePath)) {
					const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
					if (bundle[key]) {
						return bundle[key];
					}
				}
			} catch (error) {
				// Ignore errors and continue to next file
				continue;
			}
		}

		// Special handling for common extension metadata
		if (key === 'name') {
			// For extensions like hexeditor, try to derive from folder name or package name
			const packageJsonPath = path.join(extensionPath, 'package.json');
			try {
				if (fs.existsSync(packageJsonPath)) {
					const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
					if (packageJson.name) {
						// Convert kebab-case to Title Case
						return packageJson.name
							.split('-')
							.map(word => word.charAt(0).toUpperCase() + word.slice(1))
							.join(' ');
					}
				}
			} catch (error) {
				// Continue to fallback
			}
		}

		// If we can't resolve it, return a cleaned-up version of the key
		return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
	}

	return value;
}

function getExtensionsData(imgOutputPath) {
	const extensionsPath = path.join(os.homedir(), '.vscode', 'extensions');
	const extensions = [];

	try {
		const extensionFolders = fs.readdirSync(extensionsPath);

		for (const folder of extensionFolders) {
			const extensionPath = path.join(extensionsPath, folder);
			const packageJsonPath = path.join(extensionPath, 'package.json');

			// Skip if not a directory or package.json doesn't exist
			if (!fs.statSync(extensionPath).isDirectory() || !fs.existsSync(packageJsonPath)) {
				continue;
			}

			try {
				const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

				// Extract and resolve localized fields
				let title = packageJson.displayName || packageJson.name || 'Unknown';
				let description = packageJson.description || '';

				// Resolve localization strings
				title = resolveLocalizationString(title, extensionPath);
				description = resolveLocalizationString(description, extensionPath);

				// Handle icon copying
				let icon = '';
				if (packageJson.icon) {
					const iconSourcePath = path.join(extensionPath, packageJson.icon);
					const iconExtension = path.extname(packageJson.icon);
					const iconFileName = `${folder}${iconExtension}`;
					const iconDestPath = path.join(imgOutputPath, iconFileName);

					const copiedIcon = copyImage(iconSourcePath, iconDestPath, folder);
					if (copiedIcon) {
						icon = copiedIcon;
					}
				}

				// Try to get link from various possible fields
				const link = `https://marketplace.visualstudio.com/items?itemName=${packageJson.publisher}.${packageJson.name}`;

				extensions.push({
					title,
					icon,
					description,
					link
				});

			} catch (error) {
				console.error(`Error reading package.json for ${folder}:`, error.message);
			}
		}

	} catch (error) {
		console.error('Error reading extensions directory:', error.message);
		return [];
	}

	return extensions;
}

function main() {
	// Get paths from command line arguments or use defaults
	const jsonOutputPath = process.argv[2] || DEFAULT_JSON_OUTPUT;
	const imgOutputPath = process.argv[3] || DEFAULT_IMG_OUTPUT;

	console.log(`JSON output: ${jsonOutputPath}`);
	console.log(`Images output: ${imgOutputPath}`);

	// Create output directories if they don't exist
	if (!fs.existsSync(jsonOutputPath)) {
		fs.mkdirSync(jsonOutputPath, { recursive: true });
	}
	if (!fs.existsSync(imgOutputPath)) {
		fs.mkdirSync(imgOutputPath, { recursive: true });
	}

	const extensions = getExtensionsData(imgOutputPath);
	const jsonOutput = JSON.stringify(extensions, null, '\t');

	// Write to file
	const jsonFilePath = path.join(jsonOutputPath, 'extensions.json');
	fs.writeFileSync(jsonFilePath, jsonOutput);

	console.log(`Found ${extensions.length} extensions`);
	console.log(`Data written to ${jsonFilePath}`);
	console.log(`Icons copied to ${imgOutputPath}`);

	// Also log to console for preview
	console.log('\nPreview:');
	console.log(jsonOutput);rd
}

main();