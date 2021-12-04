export const NAIVE = `...
Lock vault = new Lock();

// Both threads A and B run this
public void withdrawNaively() {
    // Lock shared resources before reading/writing them
    vault.lock();

    while (!vault.hasMoney()) {
        // If we got here, there was no money: unlock to let others in.
        vault.unlock();
        // Sleep for a second to give others the opportunity to enter
        sleep(1000);

        // Lock before we re-loop and run vault.hasMoney() on L4
        vault.lock();
    }

    // vault.hasMoney() must have been true on L9: yay, we have the money!
    vault.withdrawAll();
    // Unlock the lock to prevent deadlock
    vault.unlock();
}

...
`
export const COND_VAR_WITHDRAW = `Lock vault = new Lock();
// We'll shortly see why the lock is used to create the condition variable
ConditionVariable vaultNotEmptyAnymore = vault.newConditionVariable();

// Again, both threads A and B run this
public void withdrawWithCondVar() {
    // Lock shared resources before reading/writing them
    vault.lock();

    while (!vault.hasMoney()) {
        // We wait for the condition that the "vault is not empty anymore"
        // In our previous example's while loop, recall that we:
        //  1. Called vault.unlock() 
        //  2. And then vault.lock()
        // 
        // The condition variable handles this locking for us. It:
        //  1. Unlocks the lock
        //  2. Puts us to sleep. The thread "hangs" on the .wait() call.
        //  3. If someone wakes us up, it'll re-lock vault for us, and execution will continue
        // 
        // This courtesy locking is why locks are so closely related to condition variables!
        vaultNotEmptyAnymore.wait();

        // When we wake up, we'll be here, with vault already locked for us!
    }

    // vault.hasMoney() must have been true on L10: yay, we have the money!
    vault.withdrawAll();
    vault.unlock();
} 
`

export const DEPOSIT = `// Assume we have the condition variable vaultNotEmptyAnymore from the previous example
public void deposit(int money) {
    vault.lock();

    vault.deposit(money);
    // We just put money, so the vault is not empty anymore. 
    // This call will wake up threads A and B.
    vaultNotEmptyAnymore.wakeUpAll();

    vault.unlock();
}
`
