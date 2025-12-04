// Main JavaScript for Fastboot OS Simulation
document.addEventListener('DOMContentLoaded', function() {
 const terminal = document.getElementById('terminal-panel');
 const commandInput = document.getElementById('command-input');
 
 // Menu and tab navigation
 const menuItems = document.querySelectorAll('.menu-item');
 const tabs = document.querySelectorAll('.tab');
 const panels = {
 'terminal': document.getElementById('terminal-panel'),
 'device-info': document.getElementById('device-info-panel'),
 'partitions': document.getElementById('partitions-panel'),
 'flash': document.getElementById('flash-panel'),
 'reboot': document.getElementById('reboot-panel')
 };
 
 // Initialize with terminal active
 showPanel('terminal');
 
 // Menu item click handler
 menuItems.forEach(item => {
 item.addEventListener('click', function() {
 const panel = this.getAttribute('data-panel');
 if (panel) {
 // Remove active class from all menu items
 menuItems.forEach(i => i.classList.remove('active'));
 // Add active class to clicked item
 this.classList.add('active');
 // Show the corresponding panel
 showPanel(panel);
 }
 });
 });
 
 // Tab click handler
 tabs.forEach(tab => {
 tab.addEventListener('click', function() {
 const panel = this.getAttribute('data-panel');
 if (panel) {
 // Remove active class from all tabs
 tabs.forEach(t => t.classList.remove('active'));
 // Add active class to clicked tab
 this.classList.add('active');
 // Show the corresponding panel
 showPanel(panel);
 }
 });
 });
 
 // Simulate boot process
 simulateBoot();
 
 // Handle terminal commands
 commandInput.addEventListener('keydown', function(e) {
 if (e.key === 'Enter') {
 const command = commandInput.value.trim();
 if (command) {
 addLog(`fastboot> ${command}`, 'command');
 processCommand(command);
 commandInput.value = '';
 }
 }
 });
 
 // Function to show a panel
 function showPanel(panelId) {
 // Hide all panels
 Object.values(panels).forEach(panel => {
 panel.style.display = 'none';
 });
 
 // Show the selected panel
 if (panels[panelId]) {
 panels[panelId].style.display = 'block';
 
 // If showing terminal, focus the input
 if (panelId === 'terminal') {
 commandInput.focus();
 }
 }
 }
 
 // Function to add log to terminal
 function addLog(message, type = 'info') {
 const logEntry = document.createElement('div');
 logEntry.className = `log-entry ${type}`;
 logEntry.textContent = message;
 terminal.appendChild(logEntry);
 terminal.scrollTop = terminal.scrollHeight;
 }
 
 // Simulate boot process
 function simulateBoot() {
 const bootMessages = [
 "Initializing Fastboot OS v2.1.0...",
 "Loading kernel modules...",
 "Mounting filesystems...",
 "Starting device manager...",
 "Scanning for connected devices...",
 "Found 2 devices in fastboot mode",
 "Initializing USB interface...",
 "Starting ADB bridge...",
 "Loading flash tools...",
 "System ready",
 "Type 'help' for available commands"
 ];
 
 let delay = 0;
 bootMessages.forEach((msg, index) => {
 setTimeout(() => {
 const type = index === bootMessages.length - 2 ? 'success' : 
 index === bootMessages.length - 1 ? 'info' : 'info';
 addLog(msg, type);
 }, delay);
 delay += 300 + Math.random() * 200;
 });
 }
 
 // Process terminal commands
 function processCommand(command) {
 const cmd = command.toLowerCase().split(' ')[0];
 const args = command.split(' ').slice(1);
 
 switch(cmd) {
 case 'help':
 showHelp();
 break;
 
 case 'devices':
 listDevices();
 break;
 
 case 'reboot':
 rebootCommand(args);
 break;
 
 case 'flash':
 flashCommand(args);
 break;
 
 case 'erase':
 eraseCommand(args);
 break;
 
 case 'info':
 showDeviceInfo();
 break;
 
 case 'partitions':
 listPartitions();
 break;
 
 case 'clear':
 terminal.innerHTML = '';
 break;
 
 default:
 addLog(`Unknown command: ${command}`, 'error');
 addLog("Type 'help' for available commands", 'info');
 }
 }
 
 // Show help
 function showHelp() {
 addLog("Available commands:", 'info');
 addLog(" help - Show this help message", 'info');
 addLog(" devices - List connected devices", 'info');
 addLog(" reboot [bootloader|recovery|fastboot] - Reboot device", 'info');
 addLog(" flash <partition> [filename] - Flash a partition", 'info');
 addLog(" erase <partition> - Erase a partition", 'info');
 addLog(" info - Show device information", 'info');
 addLog(" partitions - List available partitions", 'info');
 addLog(" clear - Clear the terminal", 'info');
 }
 
 // List devices
 function listDevices() {
 addLog("List of devices attached:", 'info');
 addLog("1234567890 fastboot Pixel 6 Pro", 'info');
 addLog("abcdef12345 fastboot OnePlus 9", 'info');
 }
 
 // Reboot command
 function rebootCommand(args) {
 const target = args[0] || 'system';
 
 const validTargets = ['system', 'bootloader', 'recovery', 'fastboot'];
 if (!validTargets.includes(target)) {
 addLog(`Invalid reboot target: ${target}`, 'error');
 return;
 }
 
 addLog(`Rebooting to ${target}...`, 'warning');
 
 // Simulate reboot delay
 setTimeout(() => {
 if (target === 'system') {
 addLog("Device is rebooting to system...", 'info');
 showToast("Device rebooting to system");
 } else {
 addLog(`Device is rebooting to ${target} mode...`, 'info');
 showToast(`Device rebooting to ${target}`);
 }
 }, 1000);
 }
 
 // Flash command
 function flashCommand(args) {
 if (args.length < 1) {
 addLog("Usage: flash <partition> [filename]", 'error');
 addLog("Example: flash system system.img", 'info');
 return;
 }
 
 const partition = args[0];
 const filename = args.length > 1 ? args[1] : 'selected_file.img';
 
 addLog(`Preparing to flash ${filename} to ${partition}...`, 'warning');
 
 // Simulate flash process
 simulateFlashProcess(partition, filename);
 }
 
 // Erase command
 function eraseCommand(args) {
 if (args.length < 1) {
 addLog("Usage: erase <partition>", 'error');
 addLog("Example: erase userdata", 'info');
 return;
 }
 
 const partition = args[0];
 addLog(`Erasing ${partition} partition...`, 'warning');
 
 // Simulate erase process
 setTimeout(() => {
 addLog(`Partition ${partition} erased successfully`, 'success');
 showToast(`Partition ${partition} erased`);
 }, 1500);
 }
 
 // Show device info
 function showDeviceInfo() {
 showPanel('device-info');
 addLog("Displaying device information...", 'info');
 }
 
 // List partitions
 function listPartitions() {
 showPanel('partitions');
 addLog("Displaying partition table...", 'info');
 }
 
 // Simulate flash process
 function simulateFlashProcess(partition, filename) {
 addLog(`Checking ${partition} partition...`, 'info');
 
 setTimeout(() => {
 addLog(`Partition ${partition} is valid for flashing`, 'success');
 addLog(`Loading file ${filename}...`, 'info');
 
 setTimeout(() => {
 addLog(`File verified: ${filename}`, 'success');
 addLog(`Starting flash process to ${partition}...`, 'warning');
 
 // Show progress bar
 const progressContainer = document.getElementById('flash-progress');
 const progressFill = document.getElementById('progress-fill');
 const progressText = document.getElementById('progress-text');
 
 progressContainer.style.display = 'block';
 
 // Simulate progress
 let progress = 0;
 const interval = setInterval(() => {
 progress += Math.random() * 5;
 if (progress > 100) progress = 100;
 
 progressFill.style.width = `${progress}%`;
 progressText.textContent = `${Math.round(progress)}%`;
 
 if (progress === 100) {
 clearInterval(interval);
 setTimeout(() => {
 addLog(`Flash to ${partition} completed successfully`, 'success');
 showToast(`Flash to ${partition} completed`);
 progressContainer.style.display = 'none';
 progressFill.style.width = '0%';
 progressText.textContent = '0%';
 }, 500);
 }
 }, 100);
 }, 1000);
 }, 1000);
 }
 
 // Show toast notification
 function showToast(message, duration = 3000) {
 const toast = document.getElementById('toast');
 toast.textContent = message;
 toast.style.display = 'block';
 
 setTimeout(() => {
 toast.style.display = 'none';
 }, duration);
 }
 
 // Flash panel functions
 window.showFlashDialog = function(partition) {
 showPanel('flash');
 document.getElementById('flash-partition').value = partition;
 };
 
 window.erasePartition = function(partition) {
 showPanel('terminal');
 addLog(`fastboot> erase ${partition}`, 'command');
 addLog(`Erasing ${partition} partition...`, 'warning');
 
 setTimeout(() => {
 addLog(`Partition ${partition} erased successfully`, 'success');
 showToast(`Partition ${partition} erased`);
 }, 1500);
 };
 
 window.startFlashing = function() {
 const partition = document.getElementById('flash-partition').value;
 const fileInput = document.getElementById('flash-file');
 const force = document.getElementById('flash-force').checked;
 const wipe = document.getElementById('flash-wipe').checked;
 
 if (!fileInput.files.length) {
 showToast("Please select a file to flash");
 return;
 }
 
 const filename = fileInput.files[0].name;
 showPanel('terminal');
 addLog(`fastboot> flash ${partition} ${filename}`, 'command');
 
 if (wipe) {
 addLog(`Erasing ${partition} first...`, 'warning');
 }
 
 if (force) {
 addLog("Force flag set - ignoring errors", 'warning');
 }
 
 simulateFlashProcess(partition, filename);
 };
 
 // Reboot panel functions
 window.rebootDevice = function(target) {
 showPanel('terminal');
 addLog(`fastboot> reboot ${target}`, 'command');
 addLog(`Rebooting to ${target}...`, 'warning');
 
 setTimeout(() => {
 addLog(`Device is rebooting to ${target} mode...`, 'info');
 showToast(`Device rebooting to ${target}`);
 }, 1000);
 };
 
 wi
