async function fetchValidatorData() {
    const validatorAddress = '01aea816a1db5886755c6d0c29ce4f6c54c5364e97b13fee60e7c99e7cecbcf6a8';
    // Get current language from localStorage or default to 'en'
    const lang = localStorage.getItem('lang') || 'en';
    const t = translations[lang] || translations['en'];
    try {
        const response = await fetch(`https://api.cspr.live/validators/${validatorAddress}`);
        const data = await response.json();
        
        // Update validator status
        const statusElement = document.querySelector('[data-lang="active"]');
        if (statusElement) {
            statusElement.textContent = data.is_active ? t['active'] : (t['inactive'] || 'Inactive');
            statusElement.className = data.is_active ? 'status-active' : 'status-inactive';
        }

        // Update total staked amount
        const stakedAmountElement = document.getElementById('staked-amount');
        if (stakedAmountElement) {
            const stakedAmount = (data.total_stake / 1000000000).toFixed(5); // Convert from motes to CSPR
            stakedAmountElement.textContent = `${stakedAmount} CSPR`;
        }

        // Update performance
        const performanceElement = document.querySelector('.performance');
        if (performanceElement) {
            const performance = (data.performance * 100).toFixed(1);
            performanceElement.textContent = `${performance}%`;
        }

        // Update commission
        // Find the commission label and value
        const commissionLabel = document.querySelector('[data-lang="commission"]');
        const commissionValue = commissionLabel ? commissionLabel.nextElementSibling : null;
        if (commissionValue) {
            commissionValue.textContent = `${data.commission}%`;
        }
    } catch (error) {
        console.error('Error fetching validator data:', error);
    }
}

// Fetch data when page loads
document.addEventListener('DOMContentLoaded', fetchValidatorData);

// Refresh data every 5 minutes
setInterval(fetchValidatorData, 300000);

// Add event listener for language change
window.addEventListener('languageChanged', fetchValidatorData); 